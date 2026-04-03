const FinancialRecord = require('../models/FinancialRecord');

exports.getDashboardSummary = async () => {
    const summary = await FinancialRecord.aggregate([
        { $match: { isDeleted: false } },
        {
            $group: {
                _id: null,
                totalIncome: {
                    $sum: { $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0] }
                },
                totalExpense: {
                    $sum: { $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0] }
                }
            }
        },
        {
            $project: {
                _id: 0,
                totalIncome: 1,
                totalExpense: 1,
                netBalance: { $subtract: ['$totalIncome', '$totalExpense'] }
            }
        }
    ]);

    return summary[0] || { totalIncome: 0, totalExpense: 0, netBalance: 0 };
};

exports.getCategoryTotals = async () => {
    const totals = await FinancialRecord.aggregate([
        { $match: { isDeleted: false } },
        {
            $group: {
                _id: { category: '$category', type: '$type' },
                total: { $sum: '$amount' }
            }
        },
        {
            $project: {
                _id: 0,
                category: '$_id.category',
                type: '$_id.type',
                total: 1
            }
        },
        { $sort: { total: -1 } }
    ]);

    return totals;
};

exports.getMonthlyTrends = async () => {
    const trends = await FinancialRecord.aggregate([
        { $match: { isDeleted: false } },
        {
            $group: {
                _id: {
                    year: { $year: '$date' },
                    month: { $month: '$date' },
                    type: '$type'
                },
                total: { $sum: '$amount' }
            }
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    return trends;
};

exports.getRecentActivity = async () => {
    const activity = await FinancialRecord.find({ isDeleted: false })
        .sort('-createdAt')
        .limit(5)
        .populate('userId', 'name email');
    
    return activity;
};

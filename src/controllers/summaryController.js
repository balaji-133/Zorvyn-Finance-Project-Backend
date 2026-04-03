const { getDashboardSummary, getCategoryTotals, getMonthlyTrends, getRecentActivity } = require('../services/summaryService');

// @desc    Get dashboard summary statistics
// @route   GET /api/summary
// @access  Private (Analyst, Admin)
exports.getSummary = async (req, res, next) => {
    try {
        const summary = await getDashboardSummary();
        const categories = await getCategoryTotals();
        const trends = await getMonthlyTrends();
        const recentActivity = await getRecentActivity();

        res.status(200).json({
            success: true,
            data: {
                summary,
                categories,
                trends,
                recentActivity
            }
        });
    } catch (err) {
        next(err);
    }
};

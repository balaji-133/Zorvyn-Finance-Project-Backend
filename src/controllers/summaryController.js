const { getDashboardSummary, getCategoryTotals, getMonthlyTrends, getRecentActivity } = require('../services/summaryService');
const { getCache, setCache } = require('../utils/cache');

// @desc    Get dashboard summary statistics
// @route   GET /api/summary
// @access  Private (Analyst, Admin)
exports.getSummary = async (req, res, next) => {
    try {
        const cacheKey = 'dashboard_summary';
        const cachedData = await getCache(cacheKey);

        if (cachedData) {
            return res.status(200).json({
                success: true,
                source: 'cache',
                data: cachedData
            });
        }

        const summary = await getDashboardSummary();
        const categories = await getCategoryTotals();
        const trends = await getMonthlyTrends();
        const recentActivity = await getRecentActivity();

        const responseData = {
            summary,
            categories,
            trends,
            recentActivity
        };

        // Cache for 10 minutes (600 seconds)
        await setCache(cacheKey, responseData, 600);

        res.status(200).json({
            success: true,
            source: 'database',
            data: responseData
        });
    } catch (err) {
        next(err);
    }
};

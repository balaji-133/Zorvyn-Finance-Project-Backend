const FinancialRecord = require('../models/FinancialRecord');

// @desc    Get all records
// @route   GET /api/records
// @access  Private (Analyst, Admin, Viewer)
exports.getRecords = async (req, res, next) => {
    try {
        let query;

        // Copy req.query
        const reqQuery = { ...req.query };

        // Fields to exclude
        const removeFields = ['select', 'sort', 'page', 'limit', 'search'];
        removeFields.forEach(param => delete reqQuery[param]);

        // Create query string
        let queryStr = JSON.stringify(reqQuery);

        // Create operators ($gt, $gte, etc)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

        // Finding resource
        query = FinancialRecord.find(JSON.parse(queryStr));

        // Search support
        if (req.query.search) {
            query = query.find({
                description: { $regex: req.query.search, $options: 'i' }
            });
        }

        // Select Fields
        if (req.query.select) {
            const fields = req.query.select.split(',').join(' ');
            query = query.select(fields);
        }

        // Sort
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        // Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const total = await FinancialRecord.countDocuments();

        query = query.skip(startIndex).limit(limit);

        // Executing query
        const records = await query;

        // Pagination result
        const pagination = {};
        if (endIndex < total) {
            pagination.next = { page: page + 1, limit };
        }
        if (startIndex > 0) {
            pagination.prev = { page: page - 1, limit };
        }

        res.status(200).json({
            success: true,
            count: records.length,
            pagination,
            data: records
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get single record
// @route   GET /api/records/:id
// @access  Private
exports.getRecord = async (req, res, next) => {
    try {
        const record = await FinancialRecord.findById(req.params.id);

        if (!record) {
            return res.status(404).json({ success: false, error: 'Record not found' });
        }

        res.status(200).json({ success: true, data: record });
    } catch (err) {
        next(err);
    }
};

// @desc    Create new record
// @route   POST /api/records
// @access  Private (Analyst, Admin)
exports.createRecord = async (req, res, next) => {
    try {
        // Add user to req.body
        req.body.userId = req.user.id;

        const record = await FinancialRecord.create(req.body);

        res.status(201).json({ success: true, data: record });
    } catch (err) {
        next(err);
    }
};

// @desc    Update record
// @route   PUT /api/records/:id
// @access  Private (Admin)
exports.updateRecord = async (req, res, next) => {
    try {
        let record = await FinancialRecord.findById(req.params.id);

        if (!record) {
            return res.status(404).json({ success: false, error: 'Record not found' });
        }

        record = await FinancialRecord.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: record });
    } catch (err) {
        next(err);
    }
};

// @desc    Soft delete record
// @route   DELETE /api/records/:id
// @access  Private (Admin)
exports.deleteRecord = async (req, res, next) => {
    try {
        const record = await FinancialRecord.findById(req.params.id);

        if (!record) {
            return res.status(404).json({ success: false, error: 'Record not found' });
        }

        // Soft delete
        record.isDeleted = true;
        await record.save();

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        next(err);
    }
};

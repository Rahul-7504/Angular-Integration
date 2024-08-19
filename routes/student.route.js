const express = require('express');
const router = express.Router();
const studentService = require('../services/student.service');
const nodemailer = require('nodemailer');

router.get('/get', async (req, res) => {
    try {
        const result = await studentService.getAll();
        res.status(200).json({
            code: 200,
            message: 'Data fetched successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: 'Failed to fetch data',
            error: error.message
        });
    }
});

router.post('/post', async (req, res) => {
    try {
        const result = await studentService.saveAll(req.body);
        res.status(200).json({
            code: 200,
            message: 'Data saved successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: 'Failed to save data',
            error: error.message
        });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const result = await studentService.updateAll(req.params.id, req.body);
        res.status(200).json({
            code: 200,
            message: 'Data updated successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: 'Failed to update data',
            error: error.message
        });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const result = await studentService.deleteAll(req.params.id);
        res.status(200).json({
            code: 200,
            message: 'Data deleted successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: 'Failed to delete data',
            error: error.message
        });
    }
});

router.get('/get/:name', async (req, res) => {
    try {
        const result = await studentService.getName(req.params.name);
        res.status(200).json({
            code: 200,
            message: 'Data fetched successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: 'Failed to fetch data',
            error: error.message
        });
    }
});


router.post('/sendMail', async (req, res) => {
    const { subject, message } = req.body;  // Extract subject and message from request body

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sonawanerahul1401@gmail.com',
            pass: 'iycn jlxt rirq elka'  // Use app-specific password
        }
    });

    let mailOptions = {
        from: 'sonawanerahul1401@gmail.com',
        to: 'pankajchavan7733@gmail.com',  // Hardcoded recipient email
        subject: subject || 'baap app',  // Use provided subject or default
        text: message || '422611'      // Use provided message or default
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send email', details: error.message });
    }
});

module.exports = router;

const Event = require('../models/Event');

// 1. Create Event (Admin Only)
exports.createEvent = async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: "Error creating event" });
    }
};

// 2. Get All Events
exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find().populate('participants', 'name email');
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: "Error fetching events" });
    }
};

// 3. Register for Event (Student Only)
exports.registerForEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: "Event not found" });

        // Check if already registered
        if (event.participants.includes(req.user.id)) {
            return res.status(400).json({ message: "Already registered for this event" });
        }

        event.participants.push(req.user.id);
        await event.save();
        res.json({ message: "Successfully registered!" });
    } catch (error) {
        res.status(500).json({ message: "Error registering" });
    }
};
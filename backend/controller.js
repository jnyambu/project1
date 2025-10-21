import Volunteer from "../models/volunteer.model.js";

export const createVolunteer = async (req, res) => {
  try {
    const { name, email } = req.body;
    const volunteer = await Volunteer.create({ name, email });
    res.json({ message: "Volunteer registered successfully", volunteer });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

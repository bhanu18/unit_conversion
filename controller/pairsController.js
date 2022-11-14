import Pairs from "../models/Pairs.js";
import Units from "../models/Units.js";

export const get = async (req, res) => {
    try {
        const pairs = await Pairs.findOne({ _id: req.params.id }).lean();
        const unit = await Units.find().lean();

        res.render('pairs/edit', {
            pairs,
            unit
        })
    } catch (error) {
        console.log(error);
    }
}

export const add = async (req, res) => {
    try {

        let errors = [];

        const { pairs_name, val1, val2, pair1, pair2 } = req.body;

        if (!pairs_name || !val1 || !val2 || !pair1 || !pair2) {
            errors.push(1)
        }

        if (errors.length > 0) {
            req.flash('error_msg', 'The fields are incomplete');
            res.redirect('/')
        } else {
            await Pairs.create(req.body);

            req.flash('success_msg', 'Added succesfully');
            res.redirect('/');
        }
    } catch (error) {
        console.log(error)
    }
}

export const edit = async (req, res) => {
    try {

        let errors = [];

        const { pairs_name, val1, val2, pair1, pair2 } = req.body;

        if (!pairs_name || !val1 || !val2 || !pair1 || !pair2) {
            errors.push({ msg: "Please enter the required fields" })
        }

        if (errors.length > 0) {

            const pairs = await Pairs.findOne({ _id: req.params.id }).lean();
            const unit = await Units.find().lean();
            res.render('pairs/edit', {
                pairs,
                errors,
                unit
            })
        } else {

            await Pairs.findOneAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
                runValidators: true,
            })

            req.flash('success_msg', 'Updated succesfully');
            res.redirect('/');

        }
    } catch (error) {
        console.log(error);
    }
}

export const deletePair = async (req, res) => {
    try {
        await Pairs.findOneAndDelete({ _id: req.params.id });

        req.flash('success_msg', 'Deleted succesfully');
        res.redirect('/');

    } catch (error) {
        console.log(error);
    }
}

export const getPair = async (req, res) => {
    try {
        const data = await Pairs.find({ pair1: req.query.pair1, pair2: req.query.pair2 }).lean();

        res.send(data);
    } catch (error) {
        console.log(error);
    }
}


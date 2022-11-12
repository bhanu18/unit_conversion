import Context from "../models/Context.js";
import System from "../models/System.js";
import Units from "../models/Units.js"

export const addUnit = async (req, res) => {
    try {

        await Units.create(req.body);

        req.flash('success_msg', 'Added succesfully');
        res.redirect('/')
    } catch (error) {
        console.log(error);
    }
}

export const getUnit = async (req, res) => {
    try {
        const context = await Context.find().lean();
        const system = await System.find().lean();
        const unit = await Units.findOne({
            _id: req.params.id
        }).populate({
            path: 'system',
        }).
            populate({
                path: 'context'
            }).lean();

        res.render('unit/edit', {
            context,
            system,
            unit
        })
    } catch (error) {

    }
}

export const editUnit = async (req, res) => {

    try {
        await Units.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
            runValidators: true,
        })

        req.flash('success_msg', 'Added succesfully');
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
}

export const deleteUnit = async (req, res) => {
    try {
        await Units.findByIdAndRemove(req.params.id);
        req.flash('success_msg', 'Deleted succesfully');
        res.redirect('/')
    } catch (error) {
        console.log(error);
    }
}


export const addContext = async (req, res) => {
    try {
        await Context.create(req.body);
        req.flash('success_msg', 'Added succesfully');
        res.redirect('/')
    } catch (error) {
        console.log(error);
    }
}
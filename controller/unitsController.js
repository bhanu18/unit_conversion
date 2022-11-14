import Context from "../models/Context.js";
import System from "../models/System.js";
import Units from "../models/Units.js"

export const addUnit = async (req, res) => {
    try {

        let errors = [];

        const { unit_name, system, context } = req.body;

        if (!unit_name || !system || !context) {
            errors.push(1)
        }

        if (errors.length > 0) {
            req.flash('error_msg', 'All field are required');
            res.redirect('/')
        } else {
            // console.log(req.body);
            await Units.create(req.body);
            req.flash('success_msg', 'Added succesfully');
            res.redirect('/')
        }

    } catch (error) {
        console.log(error);
    }
}

export const getUnit = async (req, res) => {
    try {
        const contexts = await Context.find().lean();
        const systems = await System.find().lean();
        const unit = await Units.findOne({
            _id: req.params.id
        }).populate({
            path: 'system',
        }).
            populate({
                path: 'context'
            }).lean();

        // console.log(unit);

        res.render('unit/edit', {
            contexts,
            systems,
            unit
        })
    } catch (error) {

    }
}

export const editUnit = async (req, res) => {

    try {

        let errors = [];
        const { unit_name, system, context } = req.body;

        if (!unit_name || !system || !context) {
            errors.push({msg: "Please enter the field"})
        }

        if (errors.length > 0) {

            const contexts = await Context.find().lean();
            const systems = await System.find().lean();
            const unit = await Units.findOne({
                _id: req.params.id
            }).populate({
                path: 'system',
            }).
                populate({
                    path: 'context'
                }).lean();
            res.render('unit/edit', {
                errors,
                contexts,
                systems,
                unit
            })
        } else {
            await Units.findOneAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
                runValidators: true,
            })

            req.flash('success_msg', 'Updated succesfully');
            res.redirect('/');
        }
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

        let errors = [];

        const { context_name } = req.body;

        if (!context_name) {
            errors.push(1)
        }

        if (errors.length > 0) {
            req.flash('error_msg', 'The field is incomplete');
            res.redirect('/')
        } else {
            await Context.create(req.body);
            req.flash('success_msg', 'Added succesfully');
            res.redirect('/')
        }
    } catch (error) {
        console.log(error);
    }
}

export const queryGet = async (req, res) => {
    try {

        const data = await Units.find({ context: req.query.context }).lean();

        res.send(data);
    } catch (error) {
        console.log(error);
    }
}
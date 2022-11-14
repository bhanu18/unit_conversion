import System from "../models/System.js";

export const addSystem = async (req, res) => {
    try {

        let errors = [];

        const { system_name } = req.body;

        if (!system_name) {
            errors.push(1)
        }

        if (errors.length > 0) {
            req.flash('error_msg', 'The field is incomplete');
            res.redirect('/')
        } else {

            await System.create(req.body);
            req.flash('success_msg', 'Added succesfully');
            res.redirect('/');
        }
    } catch (error) {
        console.log(error);
    }
}

export const getSystem = async (req, res) => {

    try {

        const system = await System.findById({ _id: req.params.id }).lean();

        res.render('system/edit', {
            system
        });

    } catch (error) {
        console.log(error);
    }
}
export const editSystem = async (req, res) => {

    try {

        let errors = [];

        const { system_name } = req.body;

        if (!system_name) {
            errors.push({ msg: "Please enter the field" })
        }

        if (errors.length > 0) {
            const system = await System.findById({ _id: req.params.id }).lean();

            res.render('system/edit', {
                errors,
                system
            })
        } else {

            await System.findOneAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
                runValidators: true,
            });
            req.flash('success_msg', 'Updated succesfully');
            res.redirect('/');
        }

    } catch (error) {
        console.log(error);
    }
}

export const deleteSystem = async (req, res) => {

    try {

        await System.findByIdAndRemove(req.params.id);
        req.flash('success_msg', 'Deleted succesfully');
        res.redirect('/')

    } catch (error) {
        console.log(error);
    }
}
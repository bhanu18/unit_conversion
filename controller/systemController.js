import System from "../models/System.js";

export const addSystem = async (req, res) => {
    try {
        await System.create(req.body);
        req.flash('success_msg', 'Added succesfully');
        res.redirect('/')
    } catch (error) {
        console.log(error);
    }
}

export const getSystem = async (req, res) => {
    
    try {
        
        const system = await System.findById( {_id: req.params.id}).lean();
    
        res.render('system/edit', {
            system
        });
        
    } catch (error) {
        console.log(error);
    }
}
export const editSystem = async (req, res) => {
    
    try {
        
       await System.findOneAndUpdate( { _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
    });
        req.flash('success_msg', 'Edited succesfully');
        res.redirect('/')

    } catch (error) {
        console.log(error);
    }
}

export const deleteSystem = async (req, res) => {
    
    try {
        
        await System.findOneAndRemove(req.params.id);
        req.flash('success_msg', 'Deleted succesfully');
        res.redirect('/')
        
    } catch (error) {
        console.log(error);
    }
}
import Context from "../models/Context.js";
import System from "../models/System.js";
import Units from "../models/Units.js";

export const home = async (req, res) => {

    const context = await Context.find().lean();
    const system = await System.find().lean();

    const unit = await Units.find().populate({
        path: 'system',
    }).
    populate({
        path: 'context'
    }).lean();

    res.render('home/index', {
        context,
        system,
        unit
    })
}
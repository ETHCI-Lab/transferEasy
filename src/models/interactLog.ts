import { Schema, model } from 'mongoose';
import { interact } from '../interfaces/interact';

const interactSchema = new Schema<interact>({
    ID: {type:String,required:true},
    User: {type:String,required:true},
    Agent: {type:String,required:true},
    Time: {type:String,required:true},
});


export const InteractLog = model<interact>('interactLog', interactSchema);

import { Schema, model } from 'mongoose';
import { worldinfo, light, objModel, collision, material } from '../interfaces/worldInterfaces';

const lightSchema = new Schema<light>({
    type: { type: String, required: true },
    name: { type: String, required: true },
    color: { type: String, required: true },
    intensity: { type: Number, required: false },
    position: { type: [Number], required: false },
    Shadow: { type: Boolean, required: false },
});

const modelSchema = new Schema<objModel>({
    type: { type: String, required: true },
    url: { type: String, required: true },
    scale: { type: Number, required: false },
    position: { type: [Number], required: false },
    rotation: { type: [Number], required: false },
    name: { type: String, required: true },
    anime: { type: String, required: false },
});

const collisionSchema = new Schema<collision>({
    name: { type: String, required: true },
    clickable: { type: Boolean, required: true },
    scale: { type: [Number], required: false },
    position: { type: [Number], required: false },
    rotation: { type: [Number], required: false },
    material: { type: String, required: false },
    onClick: { type: String, required: false },
    onPointerOver: { type: String, required: false },
    onPointerOut: { type: String, required: false },
});

const materialSchema = new Schema<material>({
    type: { type: String, required: true },
    name: { type: String, required: true },
    color: { type: String, required: true },
    imgpath: { type: String, required: true },
    displacementScale: { type: Number, required: true },
    emissive: { type: String, required: true },
    emissiveIntensity: { type: Number, required: true },
    transparent: { type: Boolean, required: true },
    flatShading: { type: Boolean, required: true },
    fog: { type: Boolean, required: true },
    opacity: { type: Number, required: true },
    metalness: { type: Number, required: true },
    refractionRatio: { type: Number, required: true },
    roughness: { type: Number, required: true },
});

const worldSchema = new Schema({
    name: { type: String, required: true },
    owner: { type: String, required: true },
    publish: { type: String, required: true },
    light: [lightSchema],
    objModel: [modelSchema],
    collision: [collisionSchema],
    material: [materialSchema],
    spawn: { type: [Number], required: false },
    player: { type: [Number], required: false }
});

export const worlds = model<worldinfo>('worlds', worldSchema);
export const lights = model<light>('lights', lightSchema);
export const objModels = model<objModel>('objModels', modelSchema);
export const collisions = model<collision>('collisions', collisionSchema);
export const materials = model<material>('materials', materialSchema);


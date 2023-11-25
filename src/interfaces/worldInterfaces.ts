export interface light{
    type: string
    name: string
    color: string
    intensity: number
    position : Array<number>
    Shadow:boolean
}

export interface objModel{
    type:string
    url: string
    scale:number
    position: Array<number>
    rotation: Array<number>
    name: string
    anime:string
}

export interface collision{
    clickable:boolean,
    name: string
    scale:Array<number>
    position:Array<number>
    rotation:Array<number>
    material?:string
    onClick?:string
    onPointerOver?:string
    onPointerOut?:string
}

export interface material{
    type: string
    name:string
    color:string
    imgpath:string
    displacementScale : number
    emissive:string | undefined
    emissiveIntensity:number
    transparent:boolean
    flatShading:boolean
    fog:boolean
    opacity:number
    metalness:number
    refractionRatio:number
    roughness:number
}


export interface worldinfo{
    name:string
    owner: string
    publish: string
    lights:Array<light>
    models:Array<objModel>
    collisions:Array<collision>
    materials: Array<material>
    spawn: Array<number>
    player:Array<number>
}
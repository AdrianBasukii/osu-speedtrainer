"use client"

export default function MeasurementDisplay({title, measurement} : {title: string, measurement: string | number}){
    return(
        <div className="flex flex-col justify-center items-center gap-2">
            <p className="text-accent-secondary">{title}</p>
            <h1 className="text-4xl font-semibold">{measurement}</h1>
        </div>
    )
}
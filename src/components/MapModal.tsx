import React, { useState} from 'react';
import Modal from 'react-modal';
import Map, {Source, Layer, Marker } from 'react-map-gl';
import { ArrowArcLeft } from 'phosphor-react';
import * as turf from '@turf/turf';
import { DataProps } from './DataTable';
import styles from './MapModal.module.css';

interface ModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    data?: DataProps;
    type: 'airports' | 'stadiums' | 'special';
}

const MAPBOX_TOKEN = 'pk.eyJ1IjoiamVhbmxzaWx2YSIsImEiOiJjbGRkNzFhZXYwMHI1M3Bud2g2MXZmYzNnIn0.Nf8ztLzXZ4t60QgMzeW1zQ';

export function MapModal({ isOpen, setIsOpen, data, type }: ModalProps) {
    console.log(data);
    const [zoom, setZoom] = useState(14);
    let center: DataProps | undefined = undefined;
    if (data && data.geometry?.type === 'Polygon') {
        const features = turf.points(data.geometry.coordinates[0]);
        center = turf.center(features);
    }

    function handleChangeZoom(e: React.ChangeEvent<HTMLSelectElement>) {
        console.log(e.target.value);
        setZoom(Number(e.target.value));
    }
    
    return (
        data ? (
            <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} ariaHideApp={false} className={styles.modal}>
                <div className={styles.top}>                    
                    <div className={styles.left}>
                        <ArrowArcLeft onClick={() => setIsOpen(false)} size={30} />
                        <div>
                            Select zoom
                            <select onChange={handleChangeZoom} value={zoom}>
                                <option value='4'>x1</option>
                                <option value='6'>x2</option>
                                <option value='7'>x4</option>
                                <option value='8'>x8</option>
                                <option value='10'>x16</option>
                            </select>
                        </div>
                    </div>
                    <h1>{data.properties.NAME}</h1>
                </div>
                {type === 'special' && center ? (
                    <Map
                        mapboxAccessToken={MAPBOX_TOKEN}
                        initialViewState={{
                            longitude: center.geometry.coordinates[0],
                            latitude: center.geometry.coordinates[1],
                            zoom: 14
                        }}
                        zoom={zoom}
                        style={{ width: 600, height: '75vh', marginTop: 10 }}
                        mapStyle='mapbox://styles/mapbox/streets-v9'
                    >
                        {/*@ts-expect-error Type 'string' is not assignable to type '"MultiPolygon"'*/}
                        <Source id='polygon' type='geojson' data={data} >                            
                            <Layer 
                                id='layer' 
                                type='fill' 
                                source='polygon' 
                                paint={{ 'fill-opacity': 0.5, 'fill-color': '#ffff00' }} 
                            />
                        </Source>
                    </Map>
                ) : (
                    <Map
                        mapboxAccessToken={MAPBOX_TOKEN}
                        initialViewState={{
                            longitude: data.geometry.coordinates[0],
                            latitude: data.geometry.coordinates[1],
                            zoom: 12
                        }}
                        style={{ width: 600, height: '75vh', marginTop: 10 }}
                        mapStyle='mapbox://styles/mapbox/streets-v9'
                        zoom={zoom}
                    >
                        {/*@ts-expect-error Type 'string' is not assignable to type '"MultiPolygon"'*/}
                        <Source id='dot' type='geojson' data={data}>
                            <Layer
                                id='layer'
                                type='circle'
                                source='dot'
                                paint={{ 'circle-color': type === 'airports' ? 'blue' : 'green', 'circle-radius': 10 }}
                            />
                        </Source>
                    </Map>
                )}
            </Modal>
        ) : <></>
    )
}
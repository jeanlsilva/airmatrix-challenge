import { useState } from 'react';
import Modal from 'react-modal';
import Map, { Marker } from 'react-map-gl';
import { ArrowArcLeft } from 'phosphor-react';
import { DataProps } from './DataTable';
import styles from './MapModal.module.css';

interface ModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    data?: DataProps;
    type: 'airports' | 'stadiums' | 'special';
}

// Special: coordinates: { number [][][] }
// Stadiums: coordinates: { number [] }
// Airports: coordinates: { number [] }

const customStyles: Modal.Styles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: 'var(--gray-500)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
};

const MAPBOX_TOKEN = 'pk.eyJ1IjoiamVhbmxzaWx2YSIsImEiOiJjbGRkNzFhZXYwMHI1M3Bud2g2MXZmYzNnIn0.Nf8ztLzXZ4t60QgMzeW1zQ';

export function MapModal({ isOpen, setIsOpen, data, type }: ModalProps) {
    const [viewPort, setViewPort] = useState();

    return (
        data ? (
            <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles} ariaHideApp={false}>
                <div className={styles.top}>
                    <ArrowArcLeft onClick={() => setIsOpen(false)} size={30} />
                    <h1>{data.properties.NAME}</h1>
                </div>
                {type === 'special' && Array.isArray(data.geometry.coordinates[0]) ? (
                    data.geometry.coordinates[0].map((c) => (
                        <>
                            <Map
                                mapboxAccessToken={MAPBOX_TOKEN}
                                initialViewState={{
                                    longitude: c[0],
                                    latitude: c[1],
                                    zoom: 5
                                }}
                            >
                            </Map>
                        </>
                    ))
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
                    >
                        <Marker 
                            longitude={data.geometry.coordinates[0]}
                            latitude={data.geometry.coordinates[1]}
                            color={type === 'airports' ? 'blue' : 'green'}
                        />
                    </Map>
                )}
            </Modal>
        ) : <></>
    )
}
import Modal from 'react-modal';

interface ModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    coordinates: number[] | number[][][];
    type: 'airports' | 'stadiums' | 'special';
}

// Special: coordinates: { number [][][] }
// Stadiums: coordinates: { number [] }
// Airports: coordinates: { number [] }

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: 'var(--gray-500)'
    },
  };

export function MapModal({ isOpen, setIsOpen, coordinates, type }: ModalProps) {
    return (
        <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={customStyles}>
            <h1>{type}</h1>
            {type === 'special' && Array.isArray(coordinates[0]) ? (
                coordinates[0].map((c) => (
                    <>
                        <p>X Coordinate: { c[0] }</p>
                        <p>Y Coordinate: { c[1] }</p>
                    </>
                ))
            ) : (
                <>
                    <p>X Coordinate: { coordinates[0] }</p>
                    <p>Y Coordinate: { coordinates[1] }</p>
                </>
            )}
        </Modal>
    )
}
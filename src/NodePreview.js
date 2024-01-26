import {useState} from "react";

export default function NodePreview(props) {

    const [isVisible, setIsVisible] = useState(true);

    const style = {
        position: 'fixed',
        right: isVisible ? 0 : '-100%',
        top: 0,
        height: '100%',
        width: '30%',
        backgroundColor: '#CCCCCCF6',
        transition: 'right 0.5s'
    }

    const showButtonStyle = {
        position: 'fixed',
        // right: !isVisible ? -20 : '-100%',
        right: -20,
        height: 20,
        top: '50%',
        transform: 'translateY(-50%) rotate(-90deg)',
        transition: 'right 0.5s'
    }



    const hideButtonStyle = {
        position: 'absolute',
        left: isVisible ? '-40px' : '0',
        top: '50%',
        transform: 'translateY(-50%) rotate(-90deg)',
        transition: 'left 0.5s'
    }

    const node = props.nodes.getActiveNode()

    document.test = props.nodes;


    return (
        <div>
            <button style={showButtonStyle} onClick={() => setIsVisible(!isVisible)}>
                {isVisible ? 'Скрыть' : 'Показать'}
            </button>
            <div className="NodePreview" style={style}>
                <button style={hideButtonStyle} onClick={() => setIsVisible(!isVisible)}>
                    {isVisible ? 'Скрыть' : 'Показать'}
                </button>

                {node !== null? (

                    <div>

                        <h2>
                            Узел
                        </h2>

                        Тип: {node.node_type}

                    </div>



                ): "Не выбрано ничего"}

            </div>
        </div>

    )
}

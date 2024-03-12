import React from 'react';

export default function NodeSettings({dialobild}){

    const buttonStyles = {
        position: 'fixed',
        top: '50%',
        right: dialobild.isSettingOpen ? '33%' : '0',
        transform: 'translateY(-50%) rotate(-90deg)',
    };

    const containerStyles = {
        position: 'fixed',
        right: 0,
        top: '10%',
        width: '33%',
        height: '80%',
        padding: dialobild.isSettingOpen ? '1em' : 'none',
        backgroundColor: 'lightgray',
        border: '1px solid black',
        transition: 'width 0.3s ease',

    };

    const inputStyle = {
        width: "100%"
    }

    return (
        <div>
            {dialobild.activeNode &&
                <button
                    style={buttonStyles}
                    onClick={dialobild.toggleSettingOpen}> {dialobild.isSettingOpen ? 'Закрыть' : 'Открыть'} {dialobild.activeNode && "узел " + dialobild.activeNode.id}
                </button>}

            {dialobild.activeNode && dialobild.isSettingOpen &&
                <div style={containerStyles}>
                    <div style={{textAlign: "left"}}>
                        <h3 style={{textAlign: "center"}}>Характеристики узла №{dialobild.activeNode.id}</h3>
                        Значение: <input style={inputStyle} type="text" value={dialobild.activeNode.content}
                                         onChange={e => {
                                             dialobild.activeNode.content = e.target.value;
                                             dialobild.updateNodeProperty()
                                         }}/>

                        Тип узла:
                        <select key={"select_type_"+dialobild.activeNode.nodeType} defaultValue={dialobild.activeNode.nodeType} onChange={(e) => {
                            dialobild.activeNode.nodeType = e.target.value;
                            dialobild.updateNodeProperty();
                        }}>
                            {Object.keys(dialobild.nodeTypes).map((type) => (
                                <option key={type} value={type}>{dialobild.nodeTypes[type].name}</option>
                            ))}
                        </select>


                        <button
                            style={{display: "block", backgroundColor: "palevioletred"}}
                            onClick={() => dialobild.deleteNode(dialobild.activeNode)}>Удалить узел
                        </button>

                        <h4>Связи и влияние других узлов:</h4>

                        {dialobild.selectionMode &&
                            <div>
                                <hr/>
                                Изменение связей ({dialobild.selectionMode}):
                                <button onClick={() => dialobild.setSelectionMode(null)}>
                                    Готово
                                </button>
                            </div>
                        }

                        {Object.keys(dialobild.ruleTypes).map((key) => (
                            <div>
                                <hr/>
                                {dialobild.ruleTypes[key].name}
                                {dialobild.selectionMode !== key &&
                                    <button onClick={() => dialobild.setSelectionMode(key)}>
                                        Изменить
                                    </button>
                                }
                            </div>
                        ))}
                    </div>
                </div>}
        </div>
    );

}

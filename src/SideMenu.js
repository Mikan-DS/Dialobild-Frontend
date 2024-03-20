
export default function SideMenu({dialobild}) {
    const containerStyles = {
        position: 'fixed',
        left: 0,
        top: '10%',
        width: '1em',
        height: '80%',
        padding: '1em',
        transition: 'width 0.3s ease',

    };

        // sdaasd | test | <lol> sadas

    return <div style={containerStyles}>
        {dialobild.activeNode ?
            <button onClick={() => {
                const input = prompt('Введите строку');
                if (input) {
                    dialobild.sendRawNodes(input);
                }
            }}>
                <svg width="44" height="42" viewBox="0 0 44 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M44 0H0V18.5652H44V0Z" fill="#FFB6B6"/>
                    <path d="M10.6944 21.9131H0V30.435H10.6944V21.9131Z" fill="#DE4D4D"/>
                    <path d="M26.8878 21.9131H16.1934V30.435H26.8878V21.9131Z" fill="#71FF76"/>
                    <path d="M10.6944 33.478H0V41.9998H10.6944V33.478Z" fill="#DE4D4D"/>
                    <path d="M43.0822 21.9131H32.3877V30.435H43.0822V21.9131Z" fill="#71FF76"/>
                    <path d="M4.67368 22.128C4.79301 22.2468 4.9865 22.2468 5.10582 22.128L7.05037 20.1911C7.16969 20.0723 7.16969 19.8796 7.05037 19.7607C6.93102 19.6418 6.73756 19.6418 6.61824 19.7607L4.88975 21.4824L3.16124 19.7607C3.04194 19.6418 2.84848 19.6418 2.72914 19.7607C2.60982 19.8796 2.60982 20.0723 2.72914 20.1911L4.67368 22.128ZM4.5842 18.5649V21.9128H5.1953V18.5649H4.5842Z" fill="white"/>
                    <path d="M21.4774 22.128C21.5967 22.2468 21.7902 22.2468 21.9095 22.128L23.8541 20.1911C23.9734 20.0723 23.9734 19.8796 23.8541 19.7607C23.7347 19.6418 23.5413 19.6418 23.422 19.7607L21.6935 21.4824L19.965 19.7607C19.8456 19.6418 19.6522 19.6418 19.5328 19.7607C19.4135 19.8796 19.4135 20.0723 19.5328 20.1911L21.4774 22.128ZM21.3879 18.5649V21.9128H21.999V18.5649H21.3879Z" fill="white"/>
                    <path d="M38.284 22.128C38.4034 22.2468 38.597 22.2468 38.7161 22.128L40.6609 20.1911C40.7802 20.0723 40.7802 19.8796 40.6609 19.7607C40.5415 19.6418 40.3479 19.6418 40.2286 19.7607L38.5002 21.4824L36.7715 19.7607C36.6525 19.6418 36.4589 19.6418 36.3395 19.7607C36.2202 19.8796 36.2202 20.0723 36.3395 20.1911L38.284 22.128ZM38.1947 18.5649V21.9128H38.8057V18.5649H38.1947Z" fill="white"/>
                    <path d="M4.67368 33.6929C4.79301 33.8119 4.9865 33.8119 5.10582 33.6929L7.05037 31.7561C7.16969 31.6374 7.16969 31.4445 7.05037 31.3258C6.93102 31.2068 6.73756 31.2068 6.61824 31.3258L4.88975 33.0475L3.16124 31.3258C3.04194 31.2068 2.84848 31.2068 2.72914 31.3258C2.60982 31.4445 2.60982 31.6374 2.72914 31.7561L4.67368 33.6929ZM4.5842 30.1299V33.4778H5.1953V30.1299H4.5842Z" fill="white"/>
                    <path d="M12.5093 6.74285H7.4712V9.86553H12.5093C13.2254 9.86553 13.6999 9.77621 13.9326 9.59754C14.1689 9.41526 14.2871 9.04885 14.2871 8.49834V8.11004C14.2871 7.56317 14.1689 7.19858 13.9326 7.0163C13.6999 6.83402 13.2254 6.74285 12.5093 6.74285ZM7.4712 13.9999H6.47754V5.85693H12.187C13.4582 5.85693 14.2996 5.99548 14.7114 6.27254C15.1268 6.54599 15.3345 7.05276 15.3345 7.79285V8.77176C15.3345 9.27489 15.2306 9.64312 15.0229 9.87645C14.8188 10.1098 14.4536 10.283 13.9272 10.396C14.3641 10.4434 14.6935 10.602 14.9155 10.8718C15.1375 11.1379 15.2485 11.508 15.2485 11.9819V13.9999H14.2549V12.1843C14.2549 11.652 14.1403 11.2892 13.9111 11.096C13.6855 10.9028 13.1556 10.8062 12.3213 10.8062H7.4712V13.9999ZM18.729 11.3475H24.1216L21.4038 6.6663L18.729 11.3475ZM16.0918 13.9999L20.7324 5.85693H22.0537L26.7051 13.9999H25.6523L24.605 12.2062H18.2456L17.2251 13.9999H16.0918ZM29.4013 13.9999L26.3076 5.85693H27.3335L30.1051 13.1468L32.7638 5.85693H34.0849L36.7276 13.1468L39.5205 5.85693H40.5625L37.4525 13.9999H36.0294L33.4243 6.90145L30.8192 13.9999H29.4013Z" fill="black"/>
                </svg>

            </button>:
            false
        }


    </div>
}
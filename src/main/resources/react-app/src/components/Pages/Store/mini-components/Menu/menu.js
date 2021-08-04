import './menu.css';
const Menu = () => {
    return (
        <section className="menu-container">
            <section className="menu-container__accessories">
                <h3>Accessories</h3>
                <nav className="menu-container__accessories--categories">
                    <ul className='menu-container__accessories--categories__links'>
                        <li><a href="">Apple Car</a><span>2</span></li>
                        <li><a href="">Air port & wireless</a><span>48</span></li>
                        <li><a href="">Cables & Docks</a><span>14</span></li>
                        <li><a href="">Cases & Films</a><span>15</span></li>
                        <li><a href="">Charging Devices</a><span>23</span></li>
                        <li><a href="">Connected home</a><span>1</span></li>
                        <li><a href="">Headphones</a><span>95</span></li>
                    </ul>
                </nav>
            </section>
            <section className="menu-container__prices">
                <h3>Prices</h3>
                <section className="menu-container__prices--price-range">
                    <form action="">
                            <label htmlFor="ranger"><span>Ranger: </span><span className='ranger-val'>1300</span></label>
                            <input type="range" name="ranger" id="ranger" min="0" max="1000000"/>
                    </form>
                </section>
            </section>
            <section className="menu-container__color">
                <h3>Color</h3>
                <section className="menu-container__color--color-selection">
                    <form action="">
                        <input className='color-selector' type="radio" id="c006CFF" name="age" value="30"/>
                        <input className='color-selector' type="radio" id="cFC3E39" name="age" value="60"/>
                        <input className='color-selector' type="radio" id="c171717" name="age" value="100"/>
                        <input className='color-selector' type="radio" id="cFFF600" name="age" value="100"/>
                        <input className='color-selector' type="radio" id="cFF00B4" name="age" value="100"/>
                        <input className='color-selector' type="radio" id="cEFDFDF" name="age" value="100"/>
                    </form>
                </section>
            </section>
            <section className="menu-container__brand">
                <h3>Brands</h3>
                <section className="menu-container__brand--brand">
                    <nav className="menu-container__brand--brand__selection">
                        <ul className='menu-container__brand--brand__selection__links'>
                            <li><a href="">Apple</a><span>99</span></li>
                            <li><a href="">LG</a><span>99</span></li>
                            <li><a href="">Samsung</a><span>99</span></li>
                            <li><a href="">Siemeens</a><span>99</span></li>
                        </ul>
                    </nav>
                </section>
            </section>
            <section className="menu-container__more">
                <h3>More</h3>
            </section>
        </section>
    );
}

export default Menu;
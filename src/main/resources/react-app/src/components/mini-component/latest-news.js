const LatestNews = ({image}) => {
    return (
        <div className="others-category-latestnews--box">
            <img src={image} alt=""/>
            <div className="others-category-latestnews--box--content">
            <p className="others-category-latestnews--box--content--date">01 Jan, 2015</p>
            <h5 className="others-category-latestnews--box--content--h5">Typesetting Industry</h5>
            <p className="others-category-latestnews--box--content--text">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
            </div>
        </div>
    );
}

export default LatestNews;
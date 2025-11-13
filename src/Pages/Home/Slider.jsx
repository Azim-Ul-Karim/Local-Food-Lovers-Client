import React from 'react';

const Slider = () => {
    return (
        <div className='w-10/12 md:8-12 lg:6/12 mx-auto py-5 shadow-2xl'>
            <div className="carousel w-full">
                <div id="item1" className="carousel-item w-full">
                    <img
                        src="https://i.postimg.cc/L8wxdrzc/Foo.avif"
                        className="w-full h-70 md:h-100 lg:h-110 object-cover" />
                </div>
                <div id="item2" className="carousel-item w-full">
                    <img
                        src="https://i.postimg.cc/jdkXNG3m/Pot-F.jpg"
                        className="w-full h-70 md:h-100 lg:h-110 object-cover" />
                </div>
                <div id="item3" className="carousel-item w-full">
                    <img
                        src="https://i.postimg.cc/W4c0wjmj/Res.jpg"
                        className="w-full h-70 md:h-100 lg:h-110 object-cover" />
                </div>
                <div id="item4" className="carousel-item w-full">
                    <img
                        src="https://i.postimg.cc/jjTJJcKW/Fo-T.webp"
                        className="w-full h-70 md:h-100 lg:h-110 object-cover" />
                </div>
            </div>
            <div className="flex w-full justify-center gap-2 pt-2">
                <a href="#item1" className="btn bg-gray-200 btn-xs">1</a>
                <a href="#item2" className="btn bg-gray-200 btn-xs">2</a>
                <a href="#item3" className="btn bg-gray-200 btn-xs">3</a>
                <a href="#item4" className="btn bg-gray-200 btn-xs">4</a>
            </div>
        </div>
    );
};

export default Slider;
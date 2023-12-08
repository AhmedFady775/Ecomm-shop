import React from "react";

export default function Brands() {
  const brands = [
    "https://btech.com/cdn-cgi/image/quality=80,format=auto/media/homecontent/brand/cache/56x56/s/a/samsung.png",
    "https://btech.com/cdn-cgi/image/quality=80,format=auto/media/homecontent/brand/cache/56x56/l/g/lg.png",
    "https://btech.com/cdn-cgi/image/quality=80,format=auto/media/homecontent/brand/cache/56x56/t/o/tornado.png",
    "https://btech.com/cdn-cgi/image/quality=80,format=auto/media/homecontent/brand/cache/56x56/b/r/brands_logos_180x120__toshiba.png",
    "https://btech.com/cdn-cgi/image/quality=80,format=auto/media/homecontent/brand/cache/56x56/u/l/ultra.png",
  ];
  return (
    <div className="flex items-center justify-center py-4 gap-4 my-4">
      {brands.map((category, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center gap-4 p-4"
        >
          <div className="flex items-center justify-center">
            <img src={category} alt={category} />
          </div>
        </div>
      ))}
    </div>
  );
}

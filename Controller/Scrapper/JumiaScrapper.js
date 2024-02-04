import puppeteer from "puppeteer";

const fetchData = async (siteUrl) => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false,
    });

    const page = await browser.newPage();
    await page.goto(siteUrl);

    const productsInfo = await page.evaluate(() => {
        const products = Array.from(document.querySelectorAll('.prd._fb.col.c-prd'));
        return products.map((prd) => {
            const product = {};
            const title = prd.querySelector(".name").textContent.trim();
            const price = prd.querySelector(".prc").textContent.trim();
            const imageUrl = prd.querySelector(".img-c img").getAttribute("data-src");
            const ratingIn = prd.querySelector(".in");
            const ratingWidth = ratingIn ? parseFloat(ratingIn.style.width) : 0;
            const rating = (ratingWidth / 20) * 5;

            product['name'] = title;
            product['price'] = price;
            product['imageUrl'] = imageUrl;
            product['rating'] = rating;

            return product;
        });
    });

    console.log(productsInfo);
    return productsInfo;
};

export const topDeals = async () => {
    const siteUrl = "https://www.jumia.co.ke/mlp-black-friday-h-computing-deals/";
    return fetchData(siteUrl);
};

export const refurbComputer = async () => {
    const siteUrl = 'https://www.jumia.co.ke/computing/?tag=REFU';
    return fetchData(siteUrl);
};

export const newLaptops = async () => {
    const siteUrl = 'https://www.jumia.co.ke/laptops/all-products/?tag=JMALL';
    return fetchData(siteUrl);
};

export const compAccessories = async () => {
    const siteUrl = 'https://www.jumia.co.ke/computing-accessories/';
    return fetchData(siteUrl);
};

export const printers = async () => {
    const siteUrl = 'https://www.jumia.co.ke/printers/';
    return fetchData(siteUrl);
};
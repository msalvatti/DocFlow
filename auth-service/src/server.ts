import app from './app';

const PORT = process.env.PORT || 4000;

(async () => {
    const server = app.listen(PORT, () => {
        console.log(`App [Auth Service] is running at port: ${PORT}`);
    });
})();
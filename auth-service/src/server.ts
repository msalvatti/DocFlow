import app from './app';

const PORT = process.env.PORT || 3004;

(async () => {
    const server = app.listen(PORT, () => {
        console.log(`App [Auth Service] is running at port: ${PORT}`);
    });
})();
import app from './app';

const PORT = process.env.PORT || 3006;

(async () => {
    const server = app.listen(PORT, () => {
        console.log(`App [Certificate Service] is running at port: ${PORT}`);
    });
})();
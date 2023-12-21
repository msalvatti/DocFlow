import app from './app';

const PORT = process.env.PORT || 3002;

(async () => {
    const server = app.listen(PORT, () => {
        console.log(`App [Gateway] is running at port: ${PORT}`);
    });
})();
<template>
    <div class="not-found">
        <div class="msg-box">
            <h1>404 Not Found</h1>
            <h2>
                Oops!<br>Page does not exist.
            </h2>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'notFound'
    }
</script>

<style lang="scss" scoped>
    .msg-box {
        max-width: 240px;
        margin: 50px auto;
    }
</style>

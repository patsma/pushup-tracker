<script setup>
// Update URL in description text
const route = window.location.href
</script>

<template>
  <p class="description">
    This is a
    <a href="https://rxdb.info/offline-first.html" target="_blank"
      >local first</a
    >
    todo app that stores data locally with
    <a href="https://rxdb.info/" target="_blank">RxDB</a> and replicates it
    <a href="https://rxdb.info/replication-p2p.html" target="_blank"
      >peer-to-peer with WebRTC</a
    >
    to other devices without sending the data through any central server. Open
    this url in another browser/device/tab to test the replication:
    <br />
    <code>{{ route }}</code>
    The whole app is implemented without a framework in about 200 lines of
    TypeScript code. To learn more about how it works, I recommend looking at
    the
    <a
      href="https://github.com/pubkey/rxdb-quickstart/blob/master/src/index.ts"
      target="_blank"
      >source code</a
    >
    and read the
    <a href="https://rxdb.info/quickstart.html" target="_blank"
      >RxDB Quickstart Guide</a
    >.
  </p>
</template>

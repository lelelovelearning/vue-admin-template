<template>
  <div>
    <div class="card-head">
      <span>{{ title }}</span>
      <svg
        t="1691590441099"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="5040"
        width="16"
        height="16"
      >
        <path
          d="M512 981.333333C253.866667 981.333333 42.666667 770.133333 42.666667 512S253.866667 42.666667 512 42.666667s469.333333 211.2 469.333333 469.333333-211.2 469.333333-469.333333 469.333333z m0-844.8c-206.506667 0-375.466667 168.96-375.466667 375.466667 0 206.506667 168.96 375.466667 375.466667 375.466667 206.506667 0 375.466667-168.96 375.466667-375.466667 0-206.506667-168.96-375.466667-375.466667-375.466667z"
          fill="#d4237a"
          p-id="5041"
        ></path>
        <path
          d="M512 796.714667a46.08 46.08 0 0 1-46.933333-46.933334v-269.056c0-26.624 20.352-46.933333 46.933333-46.933333 26.581333 0 46.933333 20.309333 46.933333 46.933333v269.056c0 26.624-20.352 46.933333-46.933333 46.933334zM512 364.928a46.08 46.08 0 0 1-46.933333-46.933333V274.218667c0-26.624 20.352-46.933333 46.933333-46.933334 26.581333 0 46.933333 20.309333 46.933333 46.933334v43.776c0 26.624-21.888 46.933333-46.933333 46.933333z"
          fill="#d4237a"
          p-id="5042"
        ></path>
      </svg>
    </div>
    <div class="card-content">{{ count }}</div>
    <div class="card-charts">
        <slot name="charts"> </slot>
    </div>
    <div class="card-footer">
        <slot name="footer"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "Detail",
  props:['title','count']
};
</script>
<style scoped>
.card-head{
    display: flex;
    justify-content: space-between;
    color:#d9d9d9;
    font-size: 16px;
}
.card-content{
    font-size: 30px;
    padding: 10px 0;
}
.card-charts{
    height: 50px;
}
.card-footer{
    border-top: 1px solid #eee;
    padding-top: 5px ;
}
</style>

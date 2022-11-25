<template>
  <div class="row">
    <div class="col-lg-3 col-md-3 col-sm-1 col-xs-1"></div>
    <div class="col-lg-6 col-md-6 col-sm-10 col-xs-10">
      <p class="heading">Response Submitted Successfully</p>
    </div>
    <div class="col-lg-3 col-md-3 col-sm-1 col-xs-1"></div>
  </div>
</template>

<style scoped lang="scss">
.heading {
  color: orange;
  font-size: 30px;
  transform: translate(-50%, -50%);
  position: fixed;
  top: 50%;
  left: 50%;
}
@media only screen and (min-width: 100px) and (max-width: 399px) {
  .heading {
    // line-height: 10px;
    font-size: 10px;
  }
}
@media only screen and (min-width: 400px) and (max-width: 599px) {
  .heading {
    // line-height: 10px;
    font-size: 13px;
  }
}
@media only screen and (min-width: 600px) and (max-width: 1023px) {
  .heading {
    // line-height: 10px;
    font-size: 20px;
  }
}
</style>

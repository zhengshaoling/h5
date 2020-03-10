// 关闭当前页面
export function closeView(){
  const thisVies=this.$route.fullPath;
  const visitedViews=this.$store.state.tagsView.visitedViews;
  let view=[];
  for (var i in visitedViews){
    if (thisVies === visitedViews[i].fullPath){
      view = visitedViews[i]
    }
  }
  if (view){
    this.$store.dispatch("delView", view).then(({ visitedViews }) => {
      const latestView = visitedViews.slice(-1)[0];
      if (latestView) {
        this.$router.back(-1);
      } else {
        this.$router.push('/' + this.$store.getters.company_params + '/dashboard');
      }
    });
  }
}


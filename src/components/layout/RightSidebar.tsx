const RightSidebar = async () => {
  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-lg:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">인기글 Top10</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]"></div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">인기 키워드</h3>
        <div className="mt-7 flex flex-col gap-4"></div>
      </div>
    </section>
  );
};

export default RightSidebar;

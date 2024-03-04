const loadAllForum = async (
  api = "https://openapi.programming-hero.com/api/retro-forum/posts"
) => {
  const res = await fetch(api);
  const data = await res.json();
  const allPosts = data.posts;
  showAllPosts(allPosts);
  // console.log(allPosts);
};

const showAllPosts = (allPosts) => {
  const allPostContainer = document.getElementById("all-post-container");
  const markReadContainer = document.getElementById('mark-read-container')
  markReadContainer.classList.add('hidden')
  allPostContainer.textContent = "";
  loaderHandler(true);
    setTimeout(()=>{
        for (const post of allPosts) {
            const postCard = document.createElement("div");
        
            const avatarContainerClass = post.isActive ? "bg-green-400" : "bg-red-500";
        
            postCard.innerHTML = `
                    <!-- left side -->
                    <div class="p-10 bg-[#797dfc1a] rounded-3xl grid grid-cols-1 lg:grid-cols-11 gap-6">
                    <!-- avatar part -->
                    <div class="col-span-2">
                        <div class="relative">
                            <img class="w-20 h-20 rounded-xl" src="${
                              post.image
                            }" alt="">
                            <span class="${avatarContainerClass} absolute top-1 left-[68px] transform -translate-y-1/2 w-3.5 h-3.5 border-2 border-white dark:border-gray-800 rounded-full"></span>
                        </div>
                    </div>
                    <!-- other's part -->
                    <div class="col-span-9">
                        <div class="flex flex-col lg:flex-row gap-5">
                            <p class=" p-color font-medium text-[14px]">#${
                              post.category
                            }</p>
                            <p class=" p-color font-medium text-[14px]">Author : ${
                              post.author.name
                            }</p>
                        </div>
                        <div>
                            <div>
                                <h1 class="text-[#12132D] font-bold text-[20px] pt-3"> ${
                                  post.title
                                }</h1>
                                <p class="p-color text-[16px] pt-4 border-b-2 border-dashed pb-8">${
                                  post.description
                                }</p>
                            </div>
        
                            
                            <div class="flex flex-col lg:flex-row gap-4 justify-between  mt-5 ">
                                <div class="flex flex-col lg:flex-row gap-4 lg:gap-7">
                                    <div class="flex gap-4">
                                        <p><img src="images/tabler-icon-message-2.svg" alt=""></p>
                                        <p class="text-[16px] p-color">${
                                          post.comment_count
                                        }</p>
                                    </div>
                                    <div class="flex gap-4">
                                        <p><img src="images/tabler-icon-eye.svg" alt=""></p>
                                        <p class="text-[16px] p-color">${
                                          post.view_count
                                        }</p>
                                    </div>
                                    <div class="flex gap-4">
                                        <p><img src="images/tabler-icon-clock-hour-9.svg" alt=""></p>
                                        <p class="text-[16px] p-color">${
                                          post.posted_time
                                        }</p>
                                    </div>
                                </div>
                                <div>
                                    <button onClick="getReadInfo('${escape(
                                      post.title
                                    )}','${
              post.view_count
            }')"><img src="images/email 1.svg" alt=""></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                `;
            allPostContainer.appendChild(postCard);
          }
            loaderHandler(false);
            markReadContainer.classList.remove('hidden')
    },2000)
};

let clickCount = 0;
const markReadContainer = document.getElementById("mark-read-container");
const count = document.getElementById("count");

function getReadInfo(title, view) {
  console.log(title);
  const markDetails = document.createElement("div");
  clickCount++;
  markDetails.innerHTML = `
        <div class="flex bg-white p-4 rounded-2xl mt-6 justify-between">
        <h1 class="flex-1">${unescape(title)}</h1>
        <div class="flex gap-2 items-center">
            <img src="images/tabler-icon-eye.svg" alt="">
            <p>${view}</p>
        </div>
        </div> 
    `;
  markReadContainer.appendChild(markDetails);
  count.innerText = clickCount;
}

const searchHandle = () => {
  const searchField = document.getElementById("search");
  const searchValue = searchField.value;
  showSearchPost(searchValue);
};

const showSearchPost = async (searchValue) => {
  const searchApi = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchValue}`;
  loadAllForum(searchApi);
};

const loaderHandler = (isLoading) => {
  const loading = document.getElementById("loading");
  if (isLoading) {
    loading.classList.remove("hidden");
  } else {
    loading.classList.add("hidden");
  }
};

const loadLatestPosts = async()=>{
  const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts')
  const data = await res.json();
  const allLatestPosts = data
  showAllLatestPosts(allLatestPosts)
  console.log(allLatestPosts);
}

function showAllLatestPosts (allLatestPosts){
    const latestPostContainer = document.getElementById('latest-post-container')

    allLatestPosts.forEach((post)=>{
      const postCard = document.createElement('div')
      postCard.innerHTML = `
          <div class="card w-96 h-[500px] bg-base-100 shadow-xl p-6">
          <figure><img src="${post.cover_image}" alt="Shoes" /></figure>
          <div class="flex gap-4 mt-6 mb-4">
              <img src="images/calendar.svg" alt="">
              <p class="p-color">${post.author.posted_date ? post.author.posted_date: "No publish date" }</p>
          </div>
          <div class="mb-3">
              <h1 class="text-[#12132D] font-extrabold text-[18px]">${post.title}</h1>
          </div>
          <div class="mb-4">
              <p class="p-color">${post.description}</p>
          </div>
          <div class="flex items-center gap-4">
              <div class="avatar">
                  <div class="w-12 rounded-full">
                    <img src="${post.profile_image}" />
                  </div>
              </div>
              <div>
                  <h1 class="text-[#12132D] font-bold">${post.author.name}</h1>
                  <p class="p-color text-[14px]">${post.author.designation ? post.author.designation:'unknown' }</p>
              </div>
          </div>
        </div>
      `
      latestPostContainer.appendChild(postCard)
    })
}

loadAllForum();

loadLatestPosts()

const loadAllForum = async ()=>{
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts')
    const data = await res.json()
    const allPosts = data.posts
    showAllPosts(allPosts)
}

const showAllPosts = (allPosts)=>{
    const allPostContainer = document.getElementById('all-post-container')
    for(const post of allPosts){
        const postCard = document.createElement('div')
       
        postCard.innerHTML = `
            <!-- left side -->
            <div class="p-10 bg-[#797dfc1a] rounded-3xl grid grid-cols-1 lg:grid-cols-11 gap-6">
            <!-- avatar part -->
            <div class="col-span-2">
                <div class="avatar online">
                    <div class="w-24 rounded-xl">
                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
            </div>
            <!-- other's part -->
            <div class="col-span-9">
                <div class="flex flex-col lg:flex-row gap-5">
                    <p class=" p-color font-medium text-[14px]">#${post.category}</p>
                    <p class=" p-color font-medium text-[14px]">Author : ${post.author.name}</p>
                </div>
                <div>
                    <div>
                        <h1 class="text-[#12132D] font-bold text-[20px] pt-3"> ${post.title}</h1>
                        <p class="p-color text-[16px] pt-4 border-b-2 border-dashed pb-8">${post.description}</p>
                    </div>

                    
                    <div class="flex flex-col lg:flex-row gap-4 justify-between  mt-5 ">
                        <div class="flex flex-col lg:flex-row gap-4 lg:gap-7">
                            <div class="flex gap-4">
                                <p><img src="images/tabler-icon-message-2.svg" alt=""></p>
                                <p class="text-[16px] p-color">${post.comment_count}</p>
                            </div>
                            <div class="flex gap-4">
                                <p><img src="images/tabler-icon-eye.svg" alt=""></p>
                                <p class="text-[16px] p-color">${post.view_count}</p>
                            </div>
                            <div class="flex gap-4">
                                <p><img src="images/tabler-icon-clock-hour-9.svg" alt=""></p>
                                <p class="text-[16px] p-color">${post.posted_time}</p>
                            </div>
                        </div>
                        <div>
                            <button onClick="getReadInfo('${post.title}','${post.view_count}')"><img src="images/email 1.svg" alt=""></button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        `;
        allPostContainer.appendChild(postCard)
    }
}

let clickCount = 0;
const markReadContainer = document.getElementById('mark-read-container')
const count = document.getElementById('count')
function getReadInfo(title,view) {
   const markDetails = document.createElement('div')
    clickCount++  
    markDetails.innerHTML = `
        <div class="flex bg-white p-4 rounded-2xl mt-6 justify-between">
        <h1 class="flex-1">${title}</h1>
        <div class="flex gap-2 items-center">
            <img src="images/tabler-icon-eye.svg" alt="">
            <p>${view}</p>
        </div>
        </div> 
    `
    markReadContainer.appendChild(markDetails)
    count.innerText = clickCount
}

loadAllForum()
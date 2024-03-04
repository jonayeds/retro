const loadData = async(searchInput) =>{
    const res = await fetch(`${searchInput?'https://openapi.programming-hero.com/api/retro-forum/posts?category='+searchInput :'https://openapi.programming-hero.com/api/retro-forum/posts'}`)
    const data = await res.json()
    
    displayData(data.posts)
    
}
const displayData = (allPosts)=>{
    document.getElementById('loading').classList.add('hidden')
    document.getElementById('mark-as-read-container').classList.remove('hidden')
    allPosts.forEach(item => {
        
           
        
        
        let addedPost = document.createElement('div')
        if(item.isActive){
       
    addedPost.innerHTML = `
    <div class="bg-gray-200 text-gray-600 lg:p-10 p-2 hover:bg-purple-50 border-solid border-[1px] rounded-xl hover:border-purple-200 flex gap-3 mt-6 ">
                    <div class="flex flex-col md:flex-row">
                        <img src="${item.image}" alt="" class="lg:h-20  bg-white lg:w-20 w-16 h-16 rounded-2xl " ><div class="h-4 w-4 bg-green-500 rounded-full relative md:right-4 bottom-16 md:bottom-0 -right-12">
                        </div>
                    <div>
                        <div class="flex"><p class="mr-4">#${item.category}</p><p>Author: ${item.author.name}</p></div>
                        <h2 class="mt-4 font-bold text-3xl max-w-[500px]">${item.title}</h2>
                        <p class="mt-6 max-w-80">
                            ${item.description}
                        </p>
                        <hr class="border-dashed border-gray-400 my-4  ">
                       <div class="flex justify-between items-center mt-8">
                        <div class="flex gap-4">
                            <img src="./images/comment.png" alt="">
                            <p>${item.comment_count}</p>
                            <img src="./images/views.png" class="ml-3" alt="">
                            <p>${item.view_count}</p>
                            <img src="./images/time.png" class="h-6 ml-3" alt="">
                            <p>${item.posted_time}</p>
                        </div>
                        <img src="./images/mark-as-read.png" alt="" class="cursor-pointer" onclick='append("${item.title}", "${item.view_count}")'>
                       </div>
                    </div>
                </div>
               </div>
    `
   }else{
    addedPost.innerHTML = `
    <div class="bg-gray-200 text-gray-600 lg:p-10 p-2 hover:bg-purple-50 border-solid border-[1px] rounded-xl hover:border-purple-200 flex gap-3 mt-6 ">
                    <div class="flex flex-col md:flex-row">
                        <img src="${item.image}" alt="" class="lg:h-20 w-16 h-16 bg-white lg:w-20 rounded-2xl " ><div class="h-4 w-4 bg-red-500 rounded-full relative md:right-4 bottom-16 md:bottom-0 -right-12"></div>
                    <div>
                        <div class="flex"><p class="mr-4">#${item.category}</p><p>Author: ${item.author.name}</p></div>
                        <h2 class="mt-4 font-bold text-3xl max-w-[500px]">${item.title}</h2>
                        <p class="mt-6 max-w-80">
                            ${item.description}
                        </p>
                        <hr class="border-dashed border-gray-400 my-4  ">
                       <div class="flex justify-between items-center mt-8">
                        <div class="flex gap-4">
                            <img src="./images/comment.png" alt="">
                            <p>${item.comment_count}</p>
                            <img src="./images/views.png" class="ml-3" alt="">
                            <p>${item.view_count}</p>
                            <img src="./images/time.png" class="h-6 ml-3" alt="">
                            <p>${item.posted_time}</p>
                        </div>
                        <img src="./images/mark-as-read.png" alt="" class="cursor-pointer" onclick="append('${item.title}', '${item.view_count}')">
                       </div>
                    </div>
                </div>
               </div>
    `
   }
    document.getElementById('all-posts').appendChild(addedPost)
    
    });
}
const append = (title, view_count) =>{
    // console.log(Array.isArray(allPosts))
            
                // console.log(allPosts)
                let readCount =parseInt(document.getElementById('readCount').innerText)
            let markAsRead = document.createElement('div')
            markAsRead.innerHTML = `
           
                        <p class="max-w-36">${title}</p>
                        <img src="./images/views.png" alt="" class="w-10">
                        <p class="text-gray-500">${view_count}</p>
                    
            `
            markAsRead.className = `bg-white rounded-2xl flex mt-6 py-6 px-6 gap-2 shadow-xl items-center justify-between`
            document.getElementById('mark-as-read-container').appendChild(markAsRead)
            readCount++
            document.getElementById('readCount').innerText = readCount
            
} 
const loadLatestPost = async()=>{
 const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts')
 const data = await res.json()

 
 displayLatestPost(data)
}
const displayLatestPost = (data)=>{
document.getElementById('loadingLatest').classList.add('hidden')
    
    data.forEach(item => {
        console.log(item)
        let latestPost = document.createElement('div')
        latestPost.innerHTML = `
        <figure><img src="${item.cover_image}" alt="Shoes" class="rounded-xl"/></figure>
                    <div class="card-body">
                        <div class="flex items-center gap-3"><img src="./images/date.png" alt=""><p>${item.author.posted_date?item.author.posted_date:'No publish date'}</p></div>
                      <h2 class="card-title">${item.title}</h2>
                      <p class="opacity-80">${item.description}</p>
                      <div class="flex items-center gap-3">
                        <img src="${item.profile_image}" alt="" class="w-12 h-12 rounded-full">
                        <div>
                            <h2 class="text-2xl font-semibold">${item.author.name}</h2>
                            <p class="opacity-80">${item.author.designation?item.author.designation:'Unknown'}</p>
                        </div>
                      </div>
                    </div>
        `        
        latestPost.className = `card card-compact lg:w-96 w-80 h-[529px] p-8 border-solid border-[1px] border-gray-300 shadow-xl`
        document.getElementById('latestPost').appendChild(latestPost)
    });
}
const handleSearch = ()=>{
    document.getElementById('all-posts').innerHTML = ''
    document.getElementById('loading').classList.remove('hidden')
    searchInput = document.getElementById('searchInput').value
    setTimeout(() => {
    
        loadData(searchInput)    
    }, 2000);
}
document.getElementById('loading').classList.remove('hidden')
 setTimeout(() => {
    
    loadData()    
}, 2000);

document.getElementById('loadingLatest').classList.remove('hidden')
 setTimeout(() => {
    
    loadLatestPost()    
}, 2000);

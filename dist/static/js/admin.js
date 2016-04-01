$(function(){
    $('.del').click(function(e){
        var target = $(e.target)
        var id = target.data('id')
        var tr = $('.item-id-' + id)

        $.ajax({
            type:'DELETE',
            url:'/admin/movie/list?id=' + id
        })
        .done(function(results){
            if(results.success === 1){
                if(tr.length > 0){
                    tr.remove()
                    alert('成功删除')
                }
            }
        })
    })

    $('#inputDouban').blur(function(){
        var douban = $(this)
        var id = douban.val()

        if(id){
           $.ajax({
                url:'https://api.douban.com/v2/movie/subject/' + id,
                type:'GET',
                dataType:'jsonp',
                crossDomain:true,
                cache:true,
                jsonp:'callback',
                success:function(data){
                    $('#inputTitle').val(data.title)
                    $('#inputCountry').val(data.countries[0])
                    $('#inputDirector').val(data.directors[0].name)
                    // $('#inputLanguage').val(languages[0])
                    $('#inputYear').val(data.year)
                    $('#inputPoster').val(data.images.large)
                    // $('#inputFlash').val(data.trailer_urls[0])
                    $('#inputSummary').val(data.summary)               
                }   
            }) 
        }
        
    })
});

// "directors": [{
//     "alt": "https://movie.douban.com/celebrity/1031904/", 
//     "avatars": {
//         "small": "https://img3.doubanio.com/img/celebrity/small/23346.jpg", 
//         "large": "https://img3.doubanio.com/img/celebrity/large/23346.jpg", 
//         "medium": "https://img3.doubanio.com/img/celebrity/medium/23346.jpg"
//     }, 
//     "name": "扎克·施奈德", 
//     "id": "1031904"
// }]

// $(function(){
//     $('.del').click(function(e){
//         var target = $(e.target)
//         var id = target.data('id')
//         var tr = $('.item-id-' + id)

//         $.ajax({
//             type:'DELETE',
//             url:'/admin/user/list?id=' + id
//         })
//         .done(function(results){
//             if(results.success === 1){
//                 if(tr.length > 0){
//                     tr.remove()
//                     alert('成功删除')
//                 }
//             }
//         })
//     })
// });
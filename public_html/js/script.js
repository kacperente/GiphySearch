$(function() {
    var query;
    var url
    var id;
    $("#search").keyup(function(event){
        if(event.keyCode == 13){
            $("#search-btn").click();
        }
    });
    $('#search-btn').click(function(e) {
        e.preventDefault()
        query=$('#search').val();
        $('#search').val('');
        $('.gifs-row').empty();
        $('#tags').empty();
        loadGifs(query);
    });
    $(document).on("click",'.like-btn', function(){
        like($(this).attr('class').split(' ')[1]);

    });
    $(document).on("click",'.dislike-btn', function(){
        dislike($(this).attr('class').split(' ')[1]);

    });
    function loadGifs(query)
    {
        if(query!=''){
            $.ajax({
                url: "http://api.giphy.com/v1/gifs/search?q=" + prepare(query) +  "&api_key=dc6zaTOxFJmzC",
                type: "GET",
                success: function(response){
                    createElement(response);
                },
                error: function(){
                    $('<p>Something goes wrong, try again later</p>').prependTo("#tags").hide().fadeIn(500);
                }
            });
        }
    }
    function like(id){

        $.ajax({
            url: 'like.php',
            type: "POST",
            data:{gif_id:id},
            dataType: 'json',
            success: function (data)
            {
                $('.like.'+id).text(data[0].likes);
            },
            error: function (){

            }
        });
    }
    function dislike(id){


        $.ajax({
            url: 'dislike.php',
            type: "POST",
            data:{gif_id:id},
            dataType: 'json',
            success: function (data)
            {
                $('.dislike.'+id).text(data[0].dislikes);
            },
            error: function (){

            }
        });
    }
    function showReaction(id){
        $.ajax({
            url: 'action.php',
            type: "POST",
            data: {gif_id:id},
            dataType: 'json',
            success: function (data)
            {
                if(data[0]===undefined)
                {
                    $('.like.'+id).text('0');
                    $('.dislike.'+id).text('0');
                }
                else
                {
                    $('.like.'+id).text(data[0].likes);
                    $('.dislike.'+id).text(data[0].dislikes);
                }
            },
            error: function (){
                $('.like-btn').remove();
                $('.dislike-btn').remove();
            }
        });
    }
    function prepare(query){
        return query.replace(/ /g,"+");
    }
    function makeTags(query){
        var res=query.split(" ");
        var tags='';
        for(var i=0;i<res.length;i++)
        {
            tags+="<li>#"+res[i]+"</li>";
        }
        return tags;
    }
    function createElement(response){
        if(response.data[0]===undefined)
        {
            $('<p>Nothing to show :(</p>').prependTo("#tags").hide().fadeIn(500);
        }
        else {
                for (var i = 0; i < response.data.length; i++) {
                    url= response.data[i].images.original.url;
                    id = response.data[i].id;
                    showReaction(id);
                    $('<div class="gif-item col-sm-6 col-md-6 col-sm-offset-3 col-md-offset-3">'+
                        '<img class="gif" src="'+url+'"/></br>'+
                        '<ul class="reaction '+id+'">'+
                        '<li class="like-btn '+id+'"><i class="fa fa-thumbs-up" aria-hidden="true"></i><span class="like '+id+'"></span></li>'+
                        '<li class="dislike-btn '+id+'"><i class="fa fa-thumbs-down" aria-hidden="true"></i><span class="dislike '+id+'"></span></li>'+
                        '</ul>'+
                        '</div>').prependTo(".gifs-row");
                }
            $('<ul class="tags">'+makeTags(query)+'</ul>').prependTo("#tags").hide().fadeIn(500);
        }
    }
});

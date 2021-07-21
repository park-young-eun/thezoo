$(function(){
    // 만약 접속한 기기의 가로크기가 480이상이면 menu영역이 보이고, 480이하면 menu영역을 숨김.
    var winWidth=$(window).width();
    if(winWidth>480){
        $('header nav').show();
    }else{
        $('header nav').hide();
    }

    $('.site_close').click(function(){
        $('.sitemap').hide();
    });
    $('.mo_close').click(function(){
        $('.mo_menu').hide();
    });
    $('.mo_menu').hide();
    // 모바일 버전 mo_nav 아코디언 메뉴
    $('.mo_nav .mo_sub').hide();
    $('.mo_nav>ul >li').click(function(){
        // 만약 클릭한 메뉴에 active가 설정되어 있지 않다면
        if($(this).attr('class')!='active'){
            // mo_nav의 모든 주메뉴에서 active클래스 제거
            $('.mo_nav >ul >li').removeClass('active');
            // 클릭한 메뉴만 active클래스 추가
            $(this).addClass('active');
            // 모든 서브메뉴 숨김
            $('.mo_nav .mo_sub').slideUp();
            // 클릭한 메뉴의 서브메뉴만 나타남
            $(this).find('.mo_sub').slideToggle();
            // 클릭한 메뉴에 active가 설정이되어있다면
        }else{
            // 클릭한 메뉴에서 active클래스 제거
            $(this).removeClass('active');
            // 클릭한 메뉴의 서브메뉴 숨김
            $(this).find('.mo_sub').slideUp();
        }
        
    });






    $('.mo_menu').hide();
    $('.sitemap').hide();
    //menu_btn을 클릭하면 sitemap영역이 나타남
    $('.menu_btn').click(function(){
        if(winWidth>=1600){
            $('.sitemap').show();
        }else{
            $('.mo_menu').show();
        }
    });

    // 메인슬라이드


    // 인덱스 번호를 나타내는 변수선언 및 초기화
    var num=0;
    // 왼쪽 이미지의 총 갯수를 읽어 total변수에 저장
    var total=$('.photo').length;

    // 왼쪽이미지의 높이를 읽어서, img높이 변수에 저장
    var imgHeight=$('.photo').height();
    console.log(imgHeight); //높이값을 재서 알려줌


    // 만약 접속한 기기의 가로길이가 1600 이상이면 양쪽 슬라이드 실행되고
    // 1600미만이면 모바일 슬라이드(한쪽 슬라이드) 실행
    if(winWidth>=1600){
        //pc버전
            // 왼쪽이미지영역 -첫번째 이미지가 보임
            $('.photo').css('z-index',1);
            $('.p1').css('z-index',5);
            // 가운데 이미지영역-첫번째 이미지만 보임
            $('.center_photo').hide();
            $('.center_photo:first').show();
            //오른쪽 글자영역 첫번째 글자들만 보임
            $('.main_txt').removeClass('active').hide();
            $('.main_txt:first').show().addClass('active');

            $('.box_btn').css('background-position','right center');

            // next버튼 클릭하면 왼쪽이미지가 위로 올라옴
            $('.next_btn').click(function(){
                clearInterval(auto);
                auto=setInterval(movefn,10000);
                barfn();
                // 이미지의 인덱스 번호를 1씩 증가시킴
                num++;
                // 이미지의 인덱스번호가 이미지의 총개수보다 크면 0으로 초기화
                if(num>=total) {num=0;}
                // 왼쪽 이미지의 개수만큼 반복
                $('.photo').each(function(){
                    //왼쪽 이미지의 인덱스 번호를 imgNum변수에 저장
                    var imgNum=$(this).index();
                    // 만약에 num값이랑 imgNum값이랑 같다면
                    if(num==imgNum){
                        // 모든 이미지의 순서는 뒤로함
                        $('.photo').css('z-index',1);
                        // imgNum인덱스 번호에 해당하는 이미지 이동
                        $(this).css({'top':imgHeight, 'z-index':5});
                        $(this).animate({'top':0},700,"easeOutExpo");
                        $(this).prev().css('z-index',3);
                    }

                });
                // 가운데 이미지의 개수만큼 반복
                $('.center_photo').each(function(){
                    // 가운데 이미지의 인덱스번호를 centerNum변수에 저장
                    var centerNum=$(this).index();
                    // 만약 num값과 centerNum값이 같다면
                    if(num==centerNum){
                        // 모든 가운데 이미지 안보임
                        $('.center_photo').fadeOut();
                        $(this).fadeIn();
                    }
                });

                // bottom_block숫자의 개수만큼 반복
                $('.bottom_block a').each(function(){
                    var aNum=$(this).index();
                if(num==aNum){
                        $('.bottom_block a').removeClass('active');
                        $(this).addClass('active');
                    }
                });

                // txt영역 글자 애니메이션
                $('.main_txt').each(function(){
                    // txt영역의 인덱스 번호를 txtNum에 저장
                    var txtNum=$(this).index();
                    // 만약 num값과 txtNum값이 같다면
                    if(num==txtNum){
                        $('.main_txt').removeClass('active').hide();
                        $(this).show().addClass('active');
                    }
                });
            });

            // prev버튼 클릭하면 왼쪽이미지가 아래로 내려옴
            $('.prev_btn').click(function(){
                clearInterval(auto);
                auto=setInterval(movefn,10000);
                barfn();
                // 이미지의 인덱스 번호를 1씩 감소시킴
                num--;
                // 이미지의 인덱스번호가 이미지의 총개수보다 작으면 0으로 초기화
                if(num<0) {num=total-1;}
                // 왼쪽 이미지의 개수만큼 반복
                $('.photo').each(function(){
                    //왼쪽 이미지의 인덱스 번호를 imgNum변수에 저장
                    var imgNum=$(this).index();
                    // 만약에 num값이랑 imgNum값이랑 같다면
                    if(num==imgNum){
                        // 모든 이미지의 순서는 뒤로함
                        $('.photo').css('z-index',2);
                        // imgNum인덱스 번호에 해당하는 이미지 이동
                        $(this).css({'top':-imgHeight, 'z-index':5});
                        $(this).animate({'top':0},700,"easeOutExpo");
                        $(this).prev().css('z-index',1);
                        $(this).next().css('z-index',3);
                    }
                });

                // 가운데 이미지의 개수만큼 반복
                $('.center_photo').each(function(){
                    // 가운데 이미지의 인덱스번호를 centerNum변수에 저장
                    var centerNum=$(this).index();
                    // 만약 num값과 centerNum값이 같다면
                    if(num==centerNum){
                        // 모든 가운데 이미지 안보임
                        $('.center_photo').fadeOut();
                        $(this).fadeIn();
                    }
                });
                // bottom_block숫자의 개수만큼 반복
                $('.bottom_block a').each(function(){
                    var aNum=$(this).index();
                if(num==aNum){
                        $('.bottom_block a').removeClass('active');
                        $(this).addClass('active');
                    }
                });
                // txt영역 글자 애니메이션
                $('.main_txt').each(function(){
                    // txt영역의 인덱스 번호를 txtNum에 저장
                    var txtNum=$(this).index();
                    // 만약 num값과 txtNum값이 같다면
                    if(num==txtNum){
                        $('.main_txt').removeClass('active').hide();
                        $(this).show().addClass('active');
                    }
                });
            });

            // 슬라이드 자동으로 실행(10s)
            var auto=setInterval(movefn,10000);
            // 함수선언
            function movefn(){
                $('.next_btn').click(); barfn();
            }
            // 함수선언
            function barfn(){
                $('.bar').stop();
                $('.bar').css('width',0);
                // slide_bar 안의 자식 객체 bar의 가로길이 길어짐
                $('.bar').animate({'width':'100%'},9500);
                
                
            }
            // 함수호출
            barfn();
            // .box_btn를 클릭하면 오른쪽 3개의 이미지가 이동함
            var sw=0;
            // .box의 ul의 길이/2 한 값을 ulMove변수에 저장
            var ulMove=Math.ceil($('.box ul').width()/2);
            $('.box_btn').click(function(e){
                e.preventDefault();
                // 만약 sw값이 0이면
                if(sw==0){
                    sw=1;
                    $('.box_btn').css('background-position','left center');
                    $('.box ul').stop().animate({left:-ulMove},700,'easeInOutExpo');
                }else{
                    sw=0;
                    $('.box_btn').css('background-position','right center');
                    $('.box ul').stop().animate({left:0},700,'easeInOutExpo');
                }
            });

            //fullpage
            $('#fullpage').fullpage({
                // fullpage의 동그란 메뉴 사용
                navigation:true,
                // fullpage의 동그란 메뉴위치를 화면 왼쪽으로 설정
                navigationPosition:'left',
                // fullpage의 동그란 메뉴에 각각 이름 설정
                navigationTooltips:['MAIN','PROGRAM','COMMINITY','ABOUT'],
                // fullpage의 동그란 메뉴의 이름을 사용
                showActiveTooltip:true,
                // fullpage의 내용을 불러온 다음 function안의 명령어 실행
                // 매개변수(anchorLink:메뉴랑 section 연동, index:section의 인덱스번호,
                // direction:화면이 이동하는 방향)
                afterLoad:function(anchorLink,index,direction){
                    // section의 인덱스 번호가 2 또는 4 인경우 | <- shift+\(원 기호) 
                    if(index==2 || index==4){
                        // 네비게이션 주메뉴에 active설정
                        $('header nav>ul>li').addClass('active');
                        $('.menu_btn').css('background-position','right center');
                    }
                    if(index==1 || index==3){
                        $('header nav>ul>li').removeClass('active');
                        $('.menu_btn').css('background-position','left center');
                    }
                },
                // section이 이동할때 function다음의 명령어 실행
                // 매개변수(nextIndex:다음 section을 가리킴, index:section의 인덱스번호,
                // direction:화면이 이동하는 방향)
                onLeave:function(index,nextIndex,direction){
                    // footer영역에서 네비게이션이 사라짐
                    if(index==4 && nextIndex==5){
                        $('header').fadeOut(100);
                    }else{
                        $('header').fadeIn(100);
                    }
                }
            });
    }else{
        // 태블릿, 모바일 버전
        // photo의 인덱스 번호를 나타내는 변수
        var mo_num=0;
        // photo의 총 개수를 mo_total 변수에 저장
        var mo_total=$('.photo').length;
        // photo의 가로길이를 imgWidth에 저장
        var imgWidth=$('.photo').width();

        // 모든 photo보임
        $('.photo').show();
        // 모든 center_img안의 center_photo도 보임
        $('.center_photo').show();

        // 마지막 photo 이미지를 첫번째 photo이미지의 왼쪽의 배치
        $('.photo:last-child').prependTo('.left_img');
        // 마지막 center_photo이미지를 첫번째center_photo이미지의 왼쪽에 배치
        $('.center_photo:last-child').prependTo('.center_img');
        
        // .left_img의 left값을 photo의 가로길이만큼 왼쪽으로 이동시킴
        $('.left_img').css('left',-imgWidth);
        // center_img의 left값을 photo의 가로길이만큼 왼쪽으로 이동시킴
        $('.center_img').css('left',-imgWidth);
        // right_txt의 main_txt객체중 첫번째 객체에 active클래스 설정
        $('.right_txt .main_txt:first-child').addClass('active');

       

        // next_btn에 클릭이벤트 설
        $('.next_btn').click(function(){
            // 이미지의 인덱스번호를 1씩 증가시킴
            mo_num++;
            // 만약 인덱스번호가 mo_total값 이상이면 0으로 초기화
            if(mo_num>=mo_total){mo_num=0;}

            // mo_num에 해당하지 않은 .bottom_block a은 active클래스제거
            $('.bottom_block a').eq(mo_num-1).removeClass('active');
            // mo_num에 해당하는 .bottom_block a은 active클래스 설정
            $('.bottom_block a').eq(mo_num).addClass('active');


            // mo_num에 해당하지 않은 .main_txt은 active클래스제거
            $('.main_txt').eq(mo_num-1).removeClass('active').hide();
            // mo_num에 해당하는 .main_txt은 active클래스 설정
            $('.main_txt').eq(mo_num).show().addClass('active');


            


            $('.left_img').animate({left:'-='+imgWidth},700,'easeOutExpo',
            function(){
                // left_img영역이 이동하고 첫번째 photo가 left_img영역 맨뒤로 추가됨
                $('.photo:first-child').appendTo('.left_img');
                $('.left_img').css('left',-imgWidth);
            });

            $('.center_img').animate({left:'-='+imgWidth},700,'easeOutExpo',
            function(){
                // left_img영역이 이동하고 첫번째 photo가 left_img영역 맨뒤로 추가됨
                $('.center_photo:first-child').appendTo('.center_img');
                $('.center_img').css('left',-imgWidth);
            });
            
            
        });
        //prev_btn
        $('.prev_btn').click(function(){
            // 이미지의 인덱스번호를 1씩 증가시킴
            mo_num--;
            // 만약 인덱스번호가 mo_total값 이상이면 0으로 초기화
            if(mo_num<0){mo_num=mo_total-1;}

            // mo_num에 해당하지 않은 .bottom_block a은 active클래스제거
            //:not()메서드는 ()안의 조건의 반대가 되는 객체 선택자
            $('.bottom_block a:not(:eq(mo_num))').removeClass('active');
            // mo_num에 해당하는 .bottom_block a은 active클래스 설정
            $('.bottom_block a').eq(mo_num).addClass('active');


            // mo_num에 해당하지 않은 .main_txt은 active클래스제거
            $('.main_txt:not(:eq(mo_num))').removeClass('active').hide();
            // mo_num에 해당하는 .main_txt은 active클래스 설정
            $('.main_txt').eq(mo_num).show().addClass('active');


            


            $('.left_img').animate({left:'+='+imgWidth},700,'easeOutExpo',
            function(){
                // left_img영역이 이동하고 마지막 photo가 left_img영역 맨뒤로 추가됨
                $('.photo:last-child').prependTo('.left_img');
                $('.left_img').css('left',-imgWidth);
            });

            $('.center_img').animate({left:'+='+imgWidth},700,'easeOutExpo',
            function(){
                // center_img영역이 이동하고 마지막 .center_photo가 center_img영역 맨앞로 추가됨
                $('.center_photo:last-child').prependTo('.center_img');
                $('.center_img').css('left',-imgWidth);
            });
              
        }); //prev_btn

        // mo_box 슬라이드
        // outerWidth()메서드는 padding, margin값 포함한 가로길이 구함
        var mo_width=$('.mo_box ul li').outerWidth();
        $('.mo_box ul li:last-child').prependTo('.mo_box ul');
        $('.mo_box ul').css('left',-mo_width);
        
        //배열선언
        var start={};
        var endx={};
        $('.mo_box ul').on({
            // mo_box ul 객체에 touchstart설정 / e:이벤트를 전달하는 변수
            'touchstart':function(e){
                // touches[0] : 터치이벤트가 발생한 객체
                // pageX :가로스크롤을 포함한 브라우저화면을 기준으로한 X좌표
                startX=e.touches[0].pageX;

            },
            // mo_box ul객체에 touchmove이벤트 설정
            'touchmove':function(e){
                // touch움직임이 끝난 지점의 x좌표값을 endX배열에 저장
                endX=e.touches[0].pageX;
                //touch한 시작X좌표에서 움직임이 끝난X좌표값을빼서fnX에 저장
                var fnX=startX-endX;
                // 만약 fnX값이 0보다 크면(왼쪽방향)
                if(fnX>0){
                    $('.mo_box ul').stop().animate({'left':'-='+mo_width},700,'easeInExpo',function(){
                        $('.mo_box ul li:first-child').appendTo('.mo_box ul');
                        $('.mo_box ul').css('left',-mo_width);
                    });
                // fnX값이 0보다 크지 않다면(작거나 같다면, 오른쪽방향)
                }else{
                    $('.mo_box ul').stop().animate({'left':'+='+mo_width},700,'easeInExpo',function(){
                        $('.mo_box ul li:last-child').prependTo('.mo_box ul');
                        $('.mo_box ul').css('left',-mo_width);
                    });
                }
            }
        });
    }


    

    
    

});
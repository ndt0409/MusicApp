const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)


const slideInput = $(".doashboard__progress")
const slideProgressBar = $(".doashboard__progress-bar")
const playList = $(".playlist")
const doashboardImage = $(".doashboard__image")
const currentTitle = $(".doashboard__title")
const doashboardImageBlock = $(".doashboard__image-block")
const doashMore = $(".doashboard__more")
const lyrics = $(".lyrics")
const audio = $("#audio")
const playBtn = $(".btn-play")
const nextBtn = $(".btn-next")
const prevBtn = $(".btn-prev")
const randomBtn = $(".btn-random")
const repeatBtn = $(".btn-repeat")
const inputProgress = $(".doashboard__progress")
const PLAYER_STORAGE_KEY = "PLAYER"
const durationTime = $(".doashboard__duration-time")
const currentMinute = $(".doashboard__current-minute")
const currentSecond = $(".doashboard__current-second")
const volume = $(".volume")
const volumeProgress = $(".volume-progress")
const menuVn = $(".menu-vn")
const menuUk = $(".menu-uk")


const app = {
    currentSong: 0,
    isRandom: false,
    isPlay: false,
    isRepeat: false,
    isSongUk: false,
    played: [],
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    setConfig:function(key, value){
        this.config[key] = value
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    loadConfig: function(){
        this.isRepeat = this.config.isRepeat
        this.isRandom = this.config.isRandom
        this.isSongUk = this.config.isSongUk
    },
    songsWorld: [
        {
            name: "Cứ chill thôi",
            singer: "Chillies",
            path: "Song_1.mp3",
            image: "Song_1.jpg",
            duration: 280,
            lyrics: `Vì đời còn lắm sóng gió|
            Sao em không ngồi lại cùng chút bình minh|
            Tạm bỏ lại gánh trên vai|
            Theo anh đi tìm lại một phút yên bình|<br>|
            Ngày rồi ngày vẫn những khó khăn|
            Em vẫn xoay vần cùng những nốt thăng trầm|
            Nhưng cứ vui lên em|
            Vì ngày mai lại một cơ hội để ôm trọn thế giới|<br>|
            Và cứ tan vào những êm đềm tối nay|
            Cứ tan trong màn đêm này đắm say|
            Cứ chôn vùi lắng lo vào sáng mai|
            Chút yên bình chắc đâu cần đúng sai|<br>|
            Da chuchu|
            Da chuchu|
            Da chuchu|
            Da chuchu|<br>|
            Chẳng cần bận tâm hay nghĩ suy|
            Bao âu lo em bỏ lại hết đằng sau|
            Đời là cuộc vui đôi khi|
            Cho em quên điều gì còn giữ trong đầu|<br>|
            Vài lần người ta cho em cười|
            Cho em say cũng cho em khóc vì đau|
            Nhưng cứ vui lên đi|
            Vì ngày mai lại một cơ hội và ta ngại ngần chi|<br>|
            Này cứ tan vào những êm đềm tối nay|
            Cứ tan trong màn đêm này đắm say|
            Cứ chôn vùi lắng lo vào sáng mai|
            Chút yên bình chắc đâu cần đúng sai|<br>|
            Da chuchu|
            Da chuchu|
            Da chuchu|
            Da chuchu|<br>|
            Yeah người ta bỏ chạy khi thấy đám mây đen (mây đen)|
            Em giang tay ra chờ gió bay đến (yah)|
            Người sợ hãi khi niềm tin lay chuyển (lay chuyển)|
            Em gọi đấy là cơ hội để thái độ được thay tên|<br>|
            Biết đâu mai đến ánh nắng sẽ vỡ oà|
            Và những ấm áp quanh ta mới bắt đầu lan toả|
            Những bài hát tình yêu mở đường cho tiếng cười giòn giã|
            Những ánh nhìn mà trước giờ mình lơ đễnh lướt qua|<br>|
            Rồi sẽ nhận ra quanh ta những thầm thì|
            Những niềm vui âm ỉ mắt nhắm và nhâm nhi|
            Những khoảnh khắc thần kỳ khi mình sống chậm đi|
            Tìm ra con người mới khiến cho đời mình đậm vị|<br>|
            Chill như ta và Chillies chill bên Linh nâng ly cụng ly (cheers cheers)|
            Cứ chi li làm chi vì đôi khi đến lý trí cũng cần thi vị|
            Vậy nên cứ tan vào những êm đềm tối nay (cho tình yêu được truyền từ tay qua tay)|
            Cứ tan trong màn đêm này đắm say (cho tiếng cười được ngập tràn nơi đây)|
            Cứ chôn vùi lắng lo vào sáng mai (it’s gonna be alright)|
            Và chút yên bình chắc đâu cần đúng sai ai ai ai ai (let’s chill everybody)|<br>|
            Cứ tan vào những êm đềm tối nay (it’s gonna be alright)|
            Cứ tan trong màn đêm này đắm say (it’s gonna be alright)|
            Cứ chôn vùi lắng lo vào sáng mai (it’s gonna be alright)|
            Chút yên bình chắc đâu cần đúng sai (huh)|<br>|
            Cứ tan vào những êm đềm tối nay|
            Cứ tan trong màn đêm này đắm say|
            Cứ chôn vùi lắng lo vào sáng mai|
            Chút yên bình chắc đâu cần đúng sai|
            `
        },
        {
            name: "Đế Vương",
            singer: "Đình Dũng, ACV",
            path: "Song_2.mp3",
            image: "Song_2.jpg",
            duration: 228,
            lyrics: `Một bậc quân vương mang trong con tim hình hài đất nước?
            Ngỡ như dân an ta sẽ chẳng bao giờ buồn|
            Nào ngờ một hôm ngao du nhân gian chạm một ánh mắt|
            Khiến cho ta say ta mê như chốn thiên đường|
            Trời cao như đang trêu ngươi thân ta khi bông hoa ấy|
            Trót mang con tim trao cho một nam nhân thường|
            Giận lòng ta ban cho bông hoa thơm hồi về cung cấm|
            Khiến em luôn luôn bên ta mãi mãi không buông|<br>|
            Mà nào ngờ đâu thân em nơi đây tâm trí nơi nào ?|
            Nhìn về quê hương em ôm tương tư nặng lòng biết bao|
            Một người nam nhân không vinh không hoa mà có lẽ nào ?|
            Người lại yêu thương quan tâm hơn ta một Đế Vương sao ?|
            Giọt lên Quân Vương không khi nao rơi khi nước chưa tàn|
            Mà tình chưa yên nên vương trên mi giọt buồn chứa chan|
            Đành lòng buông tay cho em ra đi với mối tình vàng|
            Một bậc quân vương uy nghiêm oai phong nhưng tim nát tan|`
        },
        {
            name: "The spectre",
            singer: "Alan Walker",
            path: "Song_3.mp3",
            image: "Song_3.jpg",
            duration: 206,
            lyrics: `Hello, hello|
            Can you hear me|
            As I scream your name?|
            Hello, hello|
            Do you need me|
            Before I fade away?|<br>|
            Is this a place that I call home?|
            To find what I've become|
            Walk along the path unknown|
            We live, we love, we lie|<br>|
            Deep in the dark, I don't need the light|
            There's a ghost inside me|
            It all belongs to the other side|
            We live, we love, we lie|
            (We live, we love, we lie)|<br>|
            Hello, hello|
            Nice to meet you|
            Voice inside my head|
            Hello, hello|
            I believe you|
            How can I forget?|<br>|
            Is this a place that I call home?|
            To find what I've become|
            Walk along the path unknown|
            We live, we love, we lie|<br>|
            Deep in the dark, I don't need the light|
            There's a ghost inside me|
            It all belongs to the other side|
            We live, we love, we lie|
            (We live, we love, we lie)|
            We live, we love, we lie|`
        },
        {
            name: "Save me",
            singer: "DEAMN",
            path: "Song_4.mp3",
            image: "Song_4.jpg",
            duration: 185,
            lyrics: `Give me, oh|
            Give me, oh, oh, oh|
            <br>|
            I see the light inside your eyes|
            You make me feel like I'm awake|
            I don't know why you make me shine|
            Like a star in the sky, I'm okay|
            <br>|
            I wanna take a breath|
            I'm falling in love, I'm falling in love|
            I wanna hold your hand|
            Don't leave me alone, don't leave me alone|
            <br>|
            You get me high, oh yeah|
            Be by my side, baby yeah (I saved)|
            Only you can save me (I saved)|
            Only you can save me|
            <br>|
            I hold you tight, you blow my mind|
            Like a bottle of wine, I'm insane|
            I come alive, you drive me wild|
            When I kiss you at night, I'm okay|
            <br>|
            I wanna take a breath|
            I'm falling in love, I'm falling in love (falling in love)|
            I wanna hold your hand|
            Don't leave me alone, don't leave me alone|
            <br>|
            You get me high, oh yeah|
            Be by my side, baby yeah (I saved)|
            Only you can save me (I saved)|
            Only you can save me|
            <br>|
            You get me high, oh yeah|
            Be by my side, baby yeah (I saved)|
            Only you can save me (I saved)|
            Only you can save me|`
        },
        {
            name: "Nevada",
            singer: "Vicetone",
            path: "Song_5.mp3",
            image: "Song_5.jpg",
            duration: 208,
            lyrics: `I've been painting every fence I know|
            Every color bleeds into the same|
            'Cause before you go and walk away|
            Yeah, you better know where you're going|
            <br>|
            Hey ya, hey ya|
            You're a wanderer, just like me|
            Hey ya, hey ya|
            Yeah, you better know where you're going|
            <br>|
            Yeah, you better know where you're going|
            <br>|
            I've been painting every fence I know|
            Every color bleeds into the same|
            'Cause before you go and walk away|
            Yeah, you better know where you're going|
            <br>|
            Hey ya, hey ya|
            You're a wanderer just like me|
            Hey ya, hey ya|
            Yeah, you better know where you're going|
            <br>|
            Yeah, you better know where you're going|
            <br>|
            Hey ya, hey ya|
            You're a wanderer just like me|
            Hey ya, hey ya|
            Yeah, you better know where you're going|
            <br>|
            Yeah, you better know where you're going|
            Yeah, you better know where you're going|
            You're a wanderer just like me|
            Yeah, you better know where you're going|
            You're a wanderer just like me|`
        },
        {
            name: "Thời không sai lệch",
            singer: "Ngải Thần",
            path: "Song_6.mp3",
            image: "Song_6.jpg",
            duration: 210,
            lyrics: `​1. Chiều hôm ấy có mưa rơi nhẹ vương mi ai,| 
            Con đường ngỡ bước chung đôi bây giờ chia hai,|
            Ai nói ra lời gian dối làm tan nát con tim ai,| 
            Một người nỡ, một người vỡ bao mộng mơ...|
            <br>|
            Rời xa nhau dẫu tim vẫn còn mang tên nhau,|
            Chỉ là giấu, giấu che đi ta còn yêu nhau,| 
            Phía cuối cuộc đời ta hứa sẽ chờ dẫu qua bao lâu,| 
            Tình vẫn đậm sâu!...|
            <br>|
            [ĐK]|
            Từng yêu nhau, từng là của nhau thật lâu,| 
            Đến sau cùng chẳng thể có nhau bạc đầu,| 
            Chẳng cần tương lai, chẳng biết có thương đau ngày mai,| 
            Chỉ cần nhau...|
            <br>|
            Giờ buông tay để được thấy nhau về sau,| 
            Trả người về những ngày tháng chưa bắt đầu,| 
            Ai rồi cũng sẽ tìm được ấm êm sau khổ đau,|
            Chỉ là không cùng nhau...|
            <br>|
            2. Hẹn nhau nhé, kiếp sau ta lại nhận ra nhau,| 
            Không lùi bước nắm tay nhau qua đời thương đau,| 
            Nước mắt để dành ta khóc những ngày có nhau bên nhau,| 
            Hẹn nhau nhé, hẹn nhau kiếp sau tìm nhau...|`
        },
        {
            name: "FRIENDS",
            singer: "Anne Marie",
            path: "Song_7.mp3",
            image: "Song_7.jpg",
            duration: 231,
            lyrics: `Ooh ooh, ooh ooh|
            Ooh ooh, ooh ooh|<br>|
            You say you love me, I say you crazy|
            We're nothing more than friends|
            You're not my lover, more like a brother|
            I known you since we were like ten, yeah|<br>|
            Don't mess it up, talking that shit|
            Only gonna push me away, that's it|
            When you say you love me, that make me crazy|
            Here we go again|<br>|
            Don't go look at me with that look in your eye|
            You really ain't going away without a fight|
            You can't be reasoned with, I'm done being polite|
            I've told you one, two, three, four, five, six thousand times|<br>|
            Haven't I made it obvious?|
            Haven't I made it clear?|
            Want me to spell it out for you?|
            F-R-I-E-N-D-S|
            Haven't I made it obvious?|
            Haven't I made it clear?|
            Want me to spell it out for you?|
            F-R-I-E-N-D-S|
            F-R-I-E-N-D-S|<br>|
            Have you got no shame? You looking insane|
            Turning up at my door|
            It's two in the morning, the rain is pouring|
            Haven't we been here before?|<br>|
            Don't mess it up, talking that shit|
            Only gonna push me away, that's it|
            Have you got no shame? You looking insane|
            Here we go again|<br>|
            So don't go look at me with that look in your eye|
            You really ain't going away without a fight|
            You can't be reasoned with, I'm done being polite|
            I've told you one, two, three, four, five, six thousand times|<br>|
            Haven't I made it obvious? (Haven't I made it?)|
            Haven't I made it clear? (Haven't I made it clear?)|
            Want me to spell it out for you?|
            F-R-I-E-N-D-S|
            Haven't I made it obvious?|
            Haven't I made it clear? (Haven't I?)|
            Want me to spell it out for you? (To spell it out for you?)|
            F-R-I-E-N-D-S|
            F-R-I-E-N-D-S|<br>|
            F-R-I-E-N-D-S|
            That's how you f- spell "friends"|
            F-R-I-E-N-D-S|
            Get that shit inside your head|
            No, no, yeah, uh, ah|
            F-R-I-E-N-D-S|
            We're just friends|<br>|
            So don't go look at me with that look in your eye|
            You really ain't going nowhere without a fight|
            You can't be reasoned with, I'm done being polite|
            I've told you one, two, three, four, five, six thousand times|<br>|
            Haven't I made it obvious? (Have I not made it obvious?)|
            Haven't I made it clear? (I made it very clear)|
            Want me to spell it out for you? (Yo)|
            F-R-I-EN-D-S (I said F-R-I-E-N-D-S)|
            Haven't I made it obvious? (I made it very obvious)|
            Haven't I made it clear? (I made it very clear)|
            Want me to spell it out for you?|
            F-R-I-E-N-D-S|
            F-R-I-E-N-D-S|<br>|
            Mmm, ooh ooh, ooh ooh|
            Ah, ah-oh, ah|`
        },
        {
            name: "Người Thương Em Cả Đời Em Xua Đuổi",
            singer: "Như Việt",
            path: "Song_8.mp3",
            image: "Song_8.jpg",
            duration: 194,
            lyrics: `Yêu làm cho ta khổ đau|
            Ai thật tâm đến cuối u sầu|
            Trong tình yêu ai biết đâu|
            Nay hạnh phúc mai thì mất nhau|<br>|
            Con đường em với anh đi|
            Đang chung đôi nhưng nay khác rồi|
            Bao lời yêu của đôi ta|
            Em đem ra rồi vội vàng xoá|<br>|
            Người thương em cả đời em xua đuổi|
            Kẻ thương em vài buổi em lại yêu|
            Để tim anh đau như ngàn vết dao đâm|
            Nhưng đâu ngờ người chẳng để tâm|<br>|
            Vậy thì thôi buông tay nhường lối cho ai|
            Để tim anh nay vỡ ra làm hai|
            Rồi ngày mai em sẽ hạnh phúc bên ai|
            Chỉ mong em đừng giống anh hiện tại|`
        },
        {
            name: "Câu Hẹn Câu Thề",
            singer: "Đình Dũng,ACV",
            path: "Song_9.mp3",
            image: "Song_9.jpg",
            duration: 147,
            lyrics: `Người đi mà chẳng nói một lời
            Để anh chơi vơi giữa dòng đời
            Lời yêu nay sao quá xa xôi
            Lời thương giờ này cũng lặng trôi
            Nhận tin em sắp sống bên người
            Mà em thương yêu đến cuối đời
            Lòng anh như đau thắt em ơi
            Làm sao để lệ thôi ngừng rơi.
            Hôm nay, em hạnh phúc rồi, em đã bên người, mà lòng em yêu.
            Em quên, câu hẹn câu thề, em hứa với người cả đời thương em.
            Em ơi! Chữ tình ngắn thôi
            Mà sao anh phải kéo theo một đời
            Em ơi! Em giờ có đôi
            Còn anh thì phải lẻ loi thật rồi
            Khi xưa, hứa chẳng cách xa
            Gừng cay muối mặn chẳng ham lụa là
            Hôm nay, áo hồng gấm hoa
            Tình xưa người trả, hết anh thật à?`
        },
        {
            name: "101520",
            singer: "Sol7 & Pretty XIX",
            path: "Song_10.mp3",
            image: "Song_10.jpg",
            duration: 191,
            lyrics: `
            Muốn chơi trốn tìm anh đếm em 3 chữ,| Khi anh mở mắt ra chỉ còn lại lá thư|
            Trong một khoảnh khắc em đã là người xa xứ,| Có thứ chỉ muốn trốn chẳng thể tìm là quá khứ|
            <br>|Nhớ góc ấy im lặng trong 2 ngày,| Em muốn thấy anh sẽ thay đổi trong mai này|
            Anh vác mic lên đây cũng chỉ để nói hay,| Còn chuyện 2 bay cứ để má hỏi thầy|
            <br>|Ta hăng say xếp giấy thật dày,| Dòng người bon chen lâu nay tìm kiếm cái vật này|
            Thầy bảo hãy tin con sẽ thấy vận may,| Đặt hết vào em một chiếc nhẫn đó tận tay|
            <br>|Tìm hoài chẳng có ai giống em,| Như ngôi sao chỉ muốn bên bóng đêm|
            Dừng lại trước khi trời mây sáng thêm,| Vì thời gian bên nhau mới đáng xem|<br>|
            
            Mười, mười lăm, hai mươi|
            Baby, I find your love|
            Tìm ở trên xuống dưới chỉ để ôm em thật chặt|
            Năm, mười, mười lăm, hai mươi|
            Anh đi tìm em giữa chốn không người|
            Năm, mười, mười lăm, hai mươi|
            Năm, mười, mười lăm, hai mươi|<br>|
            
            Cuối tuần em xem tivi chỉ để chờ anh rap,| Baby như Lê Cát Trọng Lý cho anh nghe em hát|
            Sao anh tin vào thứ mà anh còn chưa từng có nào,| Sau mùa thu thì liệu tình yêu có tan vào gió Lào|
            Slow-mo hôn em lâu lâu, I need you so close|<br>|
            Nếu như em và anh,| Uống hết ly Champagne|
            Liệu chúng ta có bên nhau khi ngày mai đến|
            Trái tim không một ai đến,| Như con tàu về sai bến|<br>|
            Em đừng đến rồi đi,| Như nốt melody|
            Don't you leave me lonely,| Cùng với DCOD bao lo âu...mau đi|<br>|
            Chìm trong anh khi em xem Vieon|
            Your world is too big,| Anh như là người tí hon|
            Mình lao vào trò chơi mà chẳng biết qua màn mấy|
            Em như ngôi nhà cứ càng cất anh càng thấy|
            Đời là trò chơi và trời cho phép nhiệm màu|
            Anh đi tìm giàu, còn nhà anh muốn tìm dâu|<br>|
            
            Mười, mười lăm, hai mươi|
            Baby, I find your love|
            Tìm ở trên xuống dưới chỉ để ôm em thật chặt|
            Năm mười mười lăm hai mươi|
            Anh đi tìm em giữa chốn không người|
            Năm mười mười lăm hai mươi|
            Năm mười mười lăm hai mươi|<br>|
            Năm mười mười lăm hai mươi|
            Em ở đâu?|
            Năm mười mười lăm hai mươi|<br>|
            Where are you at?|
            Năm mười mười lăm hai mươi|
            Em ở đâu?|
            Năm mười mười lăm hai mươi|
            Năm mười mười lăm hai mươi|
            Em ở đâu?|
            Năm mười mười lăm hai mươi x2|<br>|
            Where are you at?|
            Năm mười mười lăm hai mươi|
            Baby, I found your love|`
        },
        {
            name: "Symphony",
            singer: "Clean Bandit, Zara Larsson",
            path: "Song_11.mp3",
            image: "Song_11.jpg",
            duration: 191,
            lyrics: `I've been hearing symphonies|
            Before all I heard was silence|
            A rhapsody for you and me|
            And every melody is timeless|
            Life was stringing me along|
            Then you came and you *** me loose|
            Was solo singing on my own|
            Now I can't find the key without you|<br>
            And now your song is on repeat|
            And I'm dancin' on to your heartbeat|
            And when you're gone, I feel incomplete|
            So if you want the truth|<br>
            I just wanna be part of your symphony|
            Will you hold me tight and not let go?|
            Symphony|
            Like a love song on the radio|
            Will you hold me tight and not let go?|<br>
            I'm sorry if it's all too much|
            Every day you're here, I'm healing|
            And I was runnin' out of luck|
            I never thought I'd find this feeling|
            'Cause I've been hearing symphonies|
            Before all I heard was silence|
            A rhapsody for you and me|
            (A rhapsody for you and me)|
            And every melody is timeless|<br>

            And now your song is on repeat|
            And I'm dancin' on to your heartbeat|
            And when you're gone, I feel incomplete|
            So if you want the truth|<br>

            I just wanna be part of your symphony|
            Will you hold me tight and not let go?|
            Symphony|
            Like a love song on the radio|
            Will you hold me tight and not let go?|<br>

            And now your song is on repeat|
            And I'm dancin' on to your heartbeat|
            And when you're gone, I feel incomplete|
            So if you want the truth|<br>
            I just wanna be part of your symphony|
            Will you hold me tight and not let go?|
            Symphony|
            Like a love song on the radio|
            Symphony|
            Will you hold me tight and not let go?|
            Symphony|
            Like a love song on the radio|
            Will you hold me tight and not let go?|`
        },
        {
            name: "Hoa tàn tình tan",
            singer: "Giang Jolee",
            path: "Song_12.mp3",
            image: "Song_12.jpg",
            duration: 120,
            lyrics: `Em chẳng thấy bầu trời trong xanh|
            Em chẳng thấy tiếng chim trong lành|
            Như là giấc mơ mộng qua đây|
            Em cất tất cả vào trong trái tim để dành|<br>
            
            Yêu vội vã để rồi ra đi|
            Anh không nói nhưng em biết rồi|
            Sau lời nói anh còn yêu em|
            Là những dối lừa anh đâu muốn em bên cạnh|<br>
            
            Hoa trên giấy không sương hoa vẫn nở|
            Thương ai rồi dù trắc chở vẫn thương|
            Yêu anh quá nên em đành nuông chiều|
            Cố giả vờ và mong anh hiểu thấu|<br>
            
            Chắc có lẽ em đã sai lầm|
            Thương một người dù người ta đâu có thương|
            Hoa không tàn là hoa in trên giấy|
            Tình không tan là tình thấy trong mơ|<br><br>
        
            VER 2:|<br><br>
            
            Yêu vội vã để rồi ra đi|
            Anh không nói nhưng em biết rồi|
            Sau lời nói anh còn yêu em|
            Là những dối lừa anh đâu muốn em bên cạnh|<br>
            
            Hoa trên giấy không sương hoa vẫn nở|
            Thương ai rồi dù trắc trở vẫn thương|
            Yêu anh quá nên em đành nuông chiều|
            Cố giả vờ và mong anh hiểu thấu|<br>
        
            Chắc có lẽ em đã sai lầm|
            Thương một người dù người ta đâu có thương|
            Hoa không tàn là hoa in trên giấy|
            Tình không tan là tình thấy trong mơ|`
        },
        {
            name: "Monsters",
            singer: "Katie Sky",
            path: "Song_13.mp3",
            image: "Song_13.jpg",
            duration: 110,
            lyrics: `[Chorus]
            I see your monsters I see your pain|
            Tell me your problems I’ll chase them away| 
            I’ll be your lighthouse|
            I’ll make it okay|
            When I see your monsters|
            I’ll stand there so brave|
            And chase them all away|<br>
            <br>
            [Verse 1]<br>
            In the dark we we|
            We stand apart we we|
            Never see that the things that we need are staring right at us|
            You just want to hide hide hide|
            Hide never show your smile smile|
            Stand alone when you need someone it’s the hardest thing of all|
            That you see are the bad bad bad|
            Bad memories take your time and you’ll find me|<br>
            <br>
            [Chorus]|<br>
            I see your monsters I see your pain|
            Tell me your problems I’ll chase them away|
            I’ll be your lighthouse I’ll make it okay|
            When I see your monsters I’ll stand there so brave|
            And chase them all away|<br><br>
            
            [Verse 2]|<br>
            I could see the sky sky sky|
            Sky beautiful tonight night|
            When you breathe why can’t you see the clouds are in your head|
            I would stay there there there|
            There’s no need to fear fear|
            And when you need to talk it out with someone you can trust|
            What you see are the bad bad bad|
            Bad memories take your time and you’ll find me|<br>
            <br>
            [Chorus]<br>
            I see your monsters I see your pain|
            Tell me your problems I’ll chase them away|
            I’ll be your lighthouse I’ll make it okay|
            When I see your monsters I’ll stand there so brave|
            And chase them all away|
            I'll chase them all away|<br><br>
            
            [Bridge]|<br>
            You've got the chance to see the light|
            Even in the darkest night|
            And i'll be here like you were for me|
            So just let me in..|<br><br>
            
            [Chorus]|<br>
            Cause I see your monsters I see your pain|
            Tell me your problems I’ll chase them away|
            I’ll be your lighthouse I’ll make it okay|
            When I see your monsters I’ll stand there so brave|
            And chase them all away|<br><br>
            
            [Chorus]|<br>
            I see your monsters I see your pain|
            Tell me your problems I’ll chase them away|
            I’ll be your lighthouse I’ll make it okay|
            When I see your monsters I’ll stand there so brave|
            And chase them all away|`
        }
    ],

    songsUk: [
        {
            name: "Senorita",
            singer: "Shawn Mendes",
            path: "SongUk_1.mp3",
            image: "SongUk_1.jpg",
            duration: 191,
            lyrics: `I love it when you call me señorita|
            I wish I could pretend I didn't need ya|
            But every touch is ooh, la-la-la|
            It's true, la-la-la|
            Ooh, I should be running|
            Ooh, you keep me coming for ya|<br>|
            Land in Miami|
            The air was hot from summer rain|
            Sweat dripping off me|
            Before I even knew her name, la-la-la|
            It felt like ooh, la-la-la|
            Yeah, no|
            Sapphire moonlight|
            We danced for hours in the sand|
            Tequila sunrise|
            Her body fit right in my hands, la-la-la|
            It felt like ooh, la-la-la, yeah|<br>|
            I love it when you call me señorita|
            I wish I could pretend I didn't need ya|
            But every touch is ooh, la-la-la|
            It's true, la-la-la|
            Ooh, I should be running|
            Ooh, you know I love it when you call me señorita|
            I wish it wasn't so damn hard to leave ya|
            But every touch is ooh, la-la-la|
            It's true, la-la-la|
            Ooh, I should be running|
            Ooh, you keep me coming for ya|<br>|
            Locked in the hotel|
            There's just some things that never change|
            You say we're just friends|
            But friends don't know the way you taste, la-la-la|
            'Cause you know it's been a long time coming|
            Don't you let me fall, oh|<br>|
            Ooh, when your lips undress me|
            Hooked on your tongue|
            Ooh, love, your kiss is deadly|
            Don't stop|<br>|
            I love it when you call me señorita|
            I wish I could pretend I didn't need ya|
            But every touch is ooh, la-la-la|
            It's true, la-la-la|
            Ooh, I should be running|
            Ooh, you know I love it when you call me señorita|
            I wish it wasn't so damn hard to leave ya|
            But every touch is ooh, la-la-la|
            It's true, la-la-la (true, la-la)|
            Ooh, I should be running|
            Ooh, you keep me coming for ya|<br>|
            All along I've been coming for ya (for ya)|
            And I hope it meant something to ya (ooh)|
            Call my name, I'll be coming for ya|
            Coming for ya, coming for ya, coming for ya|<br>|
            For ya|
            For ya (oh, she loves it when I call)|
            For ya|<br>|
            Ooh, I should be running|
            Ooh, you keep me coming for ya|
            `
        },
        {
            name: "I'm a mess",
            singer: "Bebe Rexha",
            path: "SongUk_2.mp3",
            image: "SongUk_2.jpg",
            duration: 195,
            lyrics: `[Verse 1]|
            Everything's been so messed up here lately|
            Pretty sure he don't wanna be my baby|
            Oh, he don't love me, he don't love me|
            He don't love me, he don't love me, but that's okay|
            'Cause I love me, yeah, I love me|
            Yeah, I love me, yeah, I love myself anyway, hey|<br>|
            
            [Pre-Chorus]|
            Everything's gonna be alright|
            Everything's gonna be okay|
            It's gonna be a good, good life|
            That's what my therapists say|
            Everything's gonna be alright|
            Everything's gonna be just fine|
            It's gonna be a good, good life|<br>|
            
            [Chorus]|
            I'm a mess, I'm a loser|
            I'm a hater, I'm a user|
            I'm a mess for your love, it ain't new|
            I'm obsessed, I'm embarrassed|
            I don't trust no one around us|
            I'm a mess for your love, it ain't new|<br>|
            
            [Verse 2]|
            Nobody shows up unless I'm paying|
            Have a drink on me, cheers to the failing|
            Oh, he don't love me, he don't love me|
            He don't love me, he don't love me, but that's okay|
            'Cause I love me, yeah, I love me|
            Yeah, I love me, yeah, I love myself anyway, hey|<br>|
            [Pre-Chorus]|
            Everything's gonna be alright|
            Everything's gonna be okay|
            It's gonna be a good, good life|
            That's what my therapists say|
            Everything's gonna be alright|
            Everything's gonna be just fine|
            It's gonna be a good, good life|<br>|
            
            [Chorus]|
            I'm a mess, I'm a loser|
            I'm a hater, I'm a user|
            I'm a mess for your love, it ain't new|
            I'm obsessed, I'm embarrassed|
            I don't trust no one around us|
            I'm a mess for your love, it ain't new|<br>|
            
            [Bridge]|
            Everything's gonna be alright, alright|
            Everything's gonna be just fine, just fine|
            It's gonna be a good, good life|<br>|
            
            [Chorus]|
            I'm a mess, I'm a loser|
            I'm a hater, I'm a user|
            I'm a mess for your love, it ain't new|
            I'm obsessed (I'm obsessed), I'm embarrassed|
            I don't trust no one around us|
            I'm a mess for your love, it ain't new (yeah)|`
        },
        {
            name: "Sweet but Psycho",
            singer: "Ava Max",
            path: "SongUk_3.mp3",
            image: "SongUk_3.jpg",
            duration: 187,
            lyrics: `Oh, she's sweet but a psycho|
            A little bit psycho|
            At night she's screamin'|
            "I'm-ma-ma-ma out my mind"|<br>|
            Oh, she's hot but a psycho|
            So left but she's right, though|
            At night she's screamin'|
            "I'm-ma-ma-ma out my mind"|<br>|
            She'll make you curse, but she a blessin'|
            She'll rip your shirt within a second|
            You'll be coming back, back for seconds|
            With your plate, you just can't help it|<br>|
            No, no, you'll play along|
            Let her lead you on|
            You'll be saying, "No, no"|
            Then saying, "Yes, yes, yes"|
            'Cause she messin' with your head|<br>|
            Oh, she's sweet but a psycho|
            A little bit psycho|
            At night she's screamin'|
            "I'm-ma-ma-ma out my mind"|<br>|
            Oh, she's hot but a psycho|
            So left but she's right, though|
            At night she's screamin'|
            "I'm-ma-ma-ma out my mind"|<br>|
            "Grab a cop gun" kinda crazy|
            She's poison but tasty|
            Yeah, people say, "Run, don't walk away"|<br>|
            'Cause she's sweet but a psycho|
            A little bit psycho|
            At night she's screamin'|
            "I'm-ma-ma-ma out my mind"|<br>|
            See, someone said, "Don't drink her potions|
            She'll kiss your neck with no emotion|
            When she's mean, you know you love it|
            'Cause she tastes so sweet, don't sugarcoat it"|<br>|
            No, no, you'll play along|
            Let her lead you on|
            You'll be saying, "No (no, no, no), no (no)"|
            Then saying, "Yes, yes, yes"|
            'Cause she messin' with your head (hey)|<br>|
            Oh, she's sweet but a psycho|
            A little bit psycho|
            At night she's screamin'|
            "I'm-ma-ma-ma out my mind"|<br>|
            Oh, she's hot but a psycho|
            So left but she's right, though|
            At night she's screamin'|
            "I'm-ma-ma-ma out my mind"|<br>|
            "Grab a cop gun" kinda crazy|
            She's poison but tasty|
            Yeah, people say, "Run, don't walk away"|<br>|
            'Cause she's sweet but a psycho|
            A little bit psycho|
            At night she's screamin'|
            "I'm-ma-ma-ma out my mind"|<br>|
            You're just like me, you're out your mind|
            I know it's strange, we're both the crazy kind|
            You're tellin' me that I'm insane|
            Boy, don't pretend that you don't love the pain|<br>|
            Oh, she's sweet but a psycho|
            A little bit psycho|
            At night she's screamin'|
            "I'm-ma-ma-ma out my mind"|<br>|
            Oh, she's hot but a psycho|
            So left but she's right, though|
            At night she's screamin'|
            "I'm-ma-ma-ma out my mind"|<br>|
            "Grab a cop gun" kinda crazy|
            She's poison but tasty|
            Yeah, people say, "Run, don't walk away"|<br>|
            'Cause she's sweet but a psycho|
            A little bit psycho|
            At night she's screamin'|
            "I'm-ma-ma-ma out my mind"|
            `
        },
        {
            name: "Don't Wanna Know",
            singer: "Maroon 5",
            path: "SongUk_4.mp3",
            image: "SongUk_4.jpg",
            duration: 213,
            lyrics: `I don't wanna know, know, know, know|
            Who's taking you home, home, home, home|
            And loving you so, so, so, so|
            The way I used to love you, no|<br>|
            I don't wanna know, know, know, know|
            Who's taking you home, home, home, home|
            And loving you so, so, so, so|
            The way I used to love you, oh|
            I don't wanna know|<br>|
            Wasted|
            And the more I drink, the more I think about you|
            Oh, no-no, I can't take it|
            Baby, every place I go reminds me of you|<br>|
            Do you think of me, of what we used to be?|
            Is it better now that I'm not around?|
            My friends are actin' strange, they don't bring up your name|
            Are you happy now? Are you happy now?|<br>|
            I don't wanna know, know, know, know|
            Who's taking you home, home, home, home|
            And loving you so, so, so, so|
            The way I used to love you, no|<br>|
            I don't wanna know, know, know, know|
            Who's taking you home, home, home, home|
            And loving you so, so, so, so|
            The way I used to love you, oh|
            I don't wanna know|<br>|
            And every time I go out, yeah|
            I hear it from this one, hear it from that one|
            That you got someone new, yeah|<br>|
            I see, but don't believe it|
            Even in my head, you're still in my bed|
            Maybe I'm just a fool|<br>|
            Do you think of me? Of what we used to be?|
            Is it better now that I'm not around?|
            My friends are actin' strange, they don't bring up your name (Yeah mm)|
            Are you happy now? Are you happy now? (Mm)|<br>|
            I don't wanna know, know, know, know|
            Who's taking you home, home, home, home|
            And loving you so, so, so, so|
            The way I used to love you, no|<br>|
            I don't wanna know, know, know, know|
            Who's taking you home, home, home, home|
            And loving you so, so, so, so|
            The way I used to love you, oh|
            I don't wanna know|<br>|
            No more, please stop|
            No more hashtag boo'd up screenshots|
            No more trying to make me jealous on your birthday|
            You know just how I make you better on your birthday, oh|<br>|
            Do he do you like this, do he woo you like this?|
            Do he lay it down for you, touch you, pull you like this?|
            Matter of fact, never mind, we gon' let the past be|
            May be his right now, but your body's still with me, whoa|<br>|
            I don't wanna know, know, know, know|
            Who's taking you home, home, home, home|
            And loving you so, so, so, so|
            The way I used to love you, no|<br>|
            I don't wanna know, know, know, know|
            Who's taking you home, home, home, home|
            And loving you so, so, so, so|
            The way I used to love you, oh|<br>|
            I don't wanna know, know, know, know|
            Who's taking you home, home, home, home|
            And loving you so, so, so, so|
            The way I used to love you, no|<br>|
            I don't wanna know, know, know, know|
            Who's taking you home, home, home, home (You)|
            And loving you so, so, so, so (You)|
            The way I used to love you, oh|
            I don't wanna know|`
        },
        {
            name: "IDGAF",
            singer: "Dua Lipa",
            path: "SongUk_5.mp3",
            image: "SongUk_5.jpg",
            duration: 240,
            lyrics: `You call me all friendly|
            Telling me how much you miss me|
            That's funny, I guess you've heard my songs|
            Well, I'm too busy for your business|
            Go find a girl who wants to listen|
            'Cause if you think I was born yesterday|
            You have got me wrong|<br>|
            So I cut you off|
            I don't need your love|
            'Cause I already cried enough|
            I've been done|
            I've been moving on, since we said goodbye|
            I cut you off|
            I don't need your love, so you can try all you want|
            Your time is up, I'll tell you why|<br>|
            You say you're sorry|
            But it's too late now|
            So save it, get gone, shut up|
            'Cause if you think I care about you now|
            Well, boy, I don't give a fuck|<br>|
            I remember that weekend|
            When my best friend caught you creeping|
            You blamed it all on the alcohol|
            So I made my decision|
            'Cause you made your bed, sleep in it|
            Play the victim and switch your position|
            I'm through, I'm done|<br>|
            So I cut you off|
            I don't need your love|
            'Cause I already cried enough|
            I've been done|
            I've been moving on, since we said goodbye|
            I cut you off|
            I don't need your love, so you can try all you want|
            Your time is up, I'll tell you why|<br>|
            You say you're sorry|
            But it's too late now|
            So save it, get gone, shut up|
            'Cause if you think I care about you now|
            Well, boy, I don't give a fuck|<br>|
            I see you tryna get to me|
            I see you begging on your knees|
            Boy, I don't give a fuck|
            So stop tryna get to me|
            Tchh, get up off your knees|
            'Cause, boy, I don't give a fuck|<br>|
            About you|
            No, I don't give a damn|
            You keep reminiscing on when you were my man|
            But I'm over you|
            Now you're all in the past|
            You talk all that sweet talk, but I ain't coming back|<br>|
            Cut you off|
            I don't need your love|
            So you can try all you want|
            Your time is up, I'll tell you why|
            (I'll tell you why)|<br>|
            You say you're sorry|
            But it's too late now|
            So save it, get gone, shut up|
            (Too late now)|
            'Cause if you think I care about you now|
            Well, boy, I don't give a fuck|
            (Boy, I don't give a fuck)|<br>|
            I see you tryna get to me|
            I see you begging on your knees|
            Boy, I don't give a fuck|
            So stop tryna get to me (get to me)|
            Tch, get up off your knees|
            'Cause, boy, I don't give a fuck|`
        },
        {
            name: "2002",
            singer: "AnneMaria",
            path: "SongUk_6.mp3",
            image: "SongUk_6.jpg",
            duration: 187,
            lyrics: `I will always remember|
            The day you kissed my lips|
            Light as a feather|
            And it went just like this|
            No, it's never been better|
            Than the summer of 2002 (ooh)|
            Uh, we were only eleven|
            But acting like grown-ups|
            Like we are in the present|
            Drinking from plastic cups|
            Singing, "Love is forever and ever"|
            Well, I guess that was true|<br>|
            Dancing on the hood in the middle of the woods|
            On an old Mustang, where we sang|
            Songs with all our childhood friends|
            And it went like this, say|<br>|
            Oops, I got 99 problems singing bye, bye, bye|
            Hold up, if you wanna go and take a ride with me|
            Better hit me, baby, one more time, uh|
            Paint a picture for you and me|
            On the days when we were young, uh|
            Singing at the top of both our lungs|<br>|
            Now we're under the covers|
            Fast forward to eighteen|
            We are more than lovers|
            Yeah, we are all we need|
            When we're holding each other|
            I'm taken back to 2002 (ooh)|<br>|
            Yeah|
            Dancing on the hood in the middle of the woods|
            On an old Mustang, where we sang|
            Songs with all our childhood friends|
            And it went like this, say|<br>|
            Oops, I got 99 problems singing bye, bye, bye|
            Hold up, if you wanna go and take a ride with me|
            Better hit me, baby, one more time, uh|
            Paint a picture for you and me|
            On the days when we were young, uh|
            Singing at the top of both our lungs|
            On the day we fell in love|
            Ooh ooh, ooh ooh|
            On the day we fell in love|
            Ooh ooh, ooh ooh|<br>|
            Dancing on the hood in the middle of the woods|
            On an old Mustang, where we sang|
            Songs with all our childhood friends|
            Oh, now|<br>|
            Oops, I got 99 problems singing bye, bye, bye|
            Hold up, if you wanna go and take a ride with me|
            Better hit me, baby, one more time|
            Paint a picture for you and me|
            On the days when we were young|
            Singing at the top of both our lungs|
            On the day we fell in love|
            Ooh ooh, ooh ooh|
            On the day we fell in love|
            Ooh ooh, ooh ooh|
            On the day we fell in love|
            Ooh ooh, ooh ooh|
            On the day we fell in love|
            Ooh ooh, ooh ooh|
            On the day we fell in love, love, love|`
        },
        {
            name: "Perfect",
            singer: "Ed Sheeran",
            path: "SongUk_7.mp3",
            image: "SongUk_7.jpg",
            duration: 263,
            lyrics: `I found a love for me|
            Oh darling, just dive right in and follow my lead|
            Well, I found a girl, beautiful and sweet|
            Oh, I never knew you were the someone waiting for me|<br>|
            'Cause we were just kids when we fell in love|
            Not knowing what it was|
            I will not give you up this time|
            But darling, just kiss me slow, your heart is all I own|
            And in your eyes, you're holding mine|<br>|
            Baby, I'm dancing in the dark with you between my arms|<br>|
            Barefoot on the grass, listening to our favourite song|
            When you said you looked a mess, I whispered underneath my breath|
            But you heard it, darling, you look perfect tonight|<br>|
            Well I found a woman, stronger than anyone I know|
            She shares my dreams, I hope that someday I'll share her home|
            I found a love, to carry more than just my secrets|
            To carry love, to carry children of our own|<br>|
            We are still kids, but we're so in love|
            Fighting against all odds|
            I know we'll be alright this time|
            Darling, just hold my hand|
            Be my girl, I'll be your man|
            I see my future in your eyes|<br>|
            Baby, I'm dancing in the dark, with you between my arms|
            Barefoot on the grass, listening to our favorite song|
            When I saw you in that dress, looking so beautiful|
            I don't deserve this, darling, you look perfect tonight|<br>|
            Baby, I'm dancing in the dark, with you between my arms|
            Barefoot on the grass, listening to our favorite song|
            I have faith in what I see|
            Now I know I have met an angel in person|
            And she looks perfect|
            I don't deserve this|
            You look perfect tonight|
            `
        },
        {
            name: "Girls Like You",
            singer: "Maroon 5",
            path: "SongUk_8.mp3",
            image: "SongUk_8.jpg",
            duration: 232,
            lyrics: `Spent 24 hours, I need more hours with you|
            You spent the weekend getting even, ooh|
            We spent the late nights making things right between us|<br>|
            But now it's all good, babe|
            Roll that back wood, babe|
            And play me close|<br>|
            'Cause girls like you run 'round with guys like me|
            'Til sun down when I come through|
            I need a girl like you, yeah yeah|
            Girls like you love fun and, yeah, me too|
            What I want when I come through|
            I need a girl like you, yeah yeah|<br>|
            Yeah yeah yeah, yeah yeah yeah|
            I need a girl like you, yeah yeah|
            Yeah yeah yeah, yeah yeah yeah|
            I need a girl like you|<br>|
            I spent last night on the last flight to you (ey ya)|
            Took a whole day up trying to get way up, ooh|
            We spent the daylight trying to make things right between us|<br>|
            But now it's all good, babe|
            Roll that back wood, babe|
            And play me close, yeah|<br>|
            'Cause girls like you run 'round with guys like me|
            'Til sun down when I come through|
            I need a girl like you, yeah yeah|
            Girls like you love fun and, yeah, me too|
            What I want when I come through|
            I need a girl like you, yeah yeah|<br>|
            Yeah yeah yeah, yeah yeah yeah|
            I need a girl like you, yeah yeah|
            Yeah yeah yeah, yeah yeah yeah|
            I need a girl like you, yeah yeah|<br>|
            I need a girl like you, yeah yeah|<br>|
            I need a girl like you|<br>|
            Maybe it's 6:45|
            Maybe I'm barely alive|
            Maybe you've taken my shit for the last time, yeah|
            Maybe I know that I'm drunk|
            Maybe I know you're the one|
            Maybe you thinking it's better if you drive|<br>|
            Oh, 'cause girls like you run 'round with guys like me|
            'Til sun down when I come through|
            I need a girl like you, yeah|<br>|
            'Cause girls like you run 'round with guys like me|
            'Til sun down when I come through|
            I need a girl like you, yeah yeah|
            Girls like you love fun and, yeah, me too|
            What I want when I come through|
            I need a girl like you, yeah yeah|<br>|
            Yeah yeah yeah, yeah yeah yeah|
            I need a girl like you, yeah yeah|
            Yeah yeah yeah, yeah yeah yeah|
            I need a girl like you|`
        },
    ],

    renderVn: function(){
        const htmls = this.songsWorld.map((song, index) => {
            let currentSongRenderVn = this.config.currentSong === undefined ? this.currentSong : this.config.currentSong
            return`
                <div class="playlist__song ${index === currentSongRenderVn ? 'active': ''}" data-index="${index}">
                    <div class="playlist__song-thumb">
                        <img src="./assets/img/${song.image}" alt="">
                    </div>
                    <div class="playlist__song-content">
                        <h3 class="playlist__song-title">${song.name}</h3>
                        <div class="playlist__song-author">${song.singer}</div>
                    </div>
                    <div class="playlist__song-option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })
        playList.innerHTML = htmls.join("")
    },

    renderUk: function(){
        const htmls = this.songsUk.map((song, index) => {
            let currentSongRenderUk = this.config.currentSong === undefined ? this.currentSong : this.config.currentSong
            return`
                <div class="playlist__song ${index === currentSongRenderUk ? 'active': ''}" data-index="${index}">
                    <div class="playlist__song-thumb">
                        <img src="./assets/img/${song.image}" alt="">
                    </div>
                    <div class="playlist__song-content">
                        <h3 class="playlist__song-title">${song.name}</h3>
                        <div class="playlist__song-author">${song.singer}</div>
                    </div>
                    <div class="playlist__song-option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })
        playList.innerHTML = htmls.join("")
    },

    handleEvents: function(){
        const _this = this
        // Scroll top
        const widthImage = doashboardImage.offsetWidth
        window.onscroll = function(){
            var scrollY = window.scrollY
            var newWidth = widthImage - scrollY

            doashboardImage.style.width = newWidth > 0 ? `${newWidth}px` : 0
            doashboardImage.style.opacity = newWidth > 0 ? `${newWidth/widthImage}` : 0
        }

        // Show lyrics
        var isShow = false
        doashMore.onclick = (e) => {
            isShow = !isShow
            if(e.target.closest(".doashboard__more")){
                doashMore.classList.toggle("show")
            }
            if(isShow){
                lyrics.style.height = "244px"
            }else{
                lyrics.style.height = "0"
            }
        }

        // Xử lý CD quay / dừng
        const doashImageAninmate = doashboardImage.animate([
            {transform: 'rotate(360deg)'}
        ],{
            duration: 10000,
            iterations: Infinity
        })

        doashImageAninmate.pause()
        // Play toggle
        playBtn.addEventListener("click", ()=>{
            if(_this.isPlay){
                audio.pause()
            }else{
                audio.play()
            }
        })

        audio.addEventListener("play", ()=>{
            _this.isPlay = true
            playBtn.classList.add("playing")
            doashImageAninmate.play()
        })

        audio.addEventListener("pause",()=>{
            _this.isPlay = false
            playBtn.classList.remove("playing")
            doashImageAninmate.pause()
        })

        // When play audio change progress
        audio.addEventListener("timeupdate", ()=>{
            const currentTime = audio.currentTime
            _this.setCurrentTime(currentTime)
            const durationTime = audio.duration
            if(durationTime){
                const currentPercent = Math.floor(currentTime/durationTime*100)
                inputProgress.value = currentPercent
                slideProgressBar.style.width = `${currentPercent}%`
            }
        })

        // When player seeked audio
        inputProgress.addEventListener("input", (e)=>{
            var seekTime = e.target.value / 100 * audio.duration
            audio.currentTime = seekTime
            audio.muted = true
        })

        inputProgress.addEventListener("change", (e)=>{
            audio.muted = false
        })

        // Next Song
        nextBtn.addEventListener("click", ()=>{
            if(_this.isRandom){
                _this.playRandomSong()
            }else{
                _this.nextSong()
            }
            audio.play()
            if(_this.isSongUk){
                _this.renderUk()
            }else{
                _this.renderVn()
            }
            this.scrollActiveSong()
            lyrics.style.height = 0
            document.querySelector(".doashboard__more.show").classList.remove("show")
            isShow = false
        })

        // Prev Song
        prevBtn.addEventListener("click", ()=>{
            if(_this.isRandom){
                _this.playRandomSong()
            }else{
                _this.prevSong()
            }
            audio.play()
            if(_this.isSongUk){
                _this.renderUk()
            }else{
                _this.renderVn()
            }
            _this.scrollActiveSong()
            lyrics.style.height = 0
            document.querySelector(".doashboard__more.show").classList.remove("show")
            isShow = false
        })

        // Xu ly bat tat random
        randomBtn.addEventListener("click", ()=>{
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle("active", _this.isRandom)
            _this.setConfig("isRandom", _this.isRandom)
        })

        // Audio ended
        audio.addEventListener("ended", ()=>{
            if(_this.isRepeat){
                audio.play()
            }else{
                nextBtn.click()
            }
        })

        // Xu ly bat tat repeat
        repeatBtn.addEventListener("click", ()=>{
            _this.isRepeat = !_this.isRepeat
            repeatBtn.classList.toggle("active", _this.isRepeat)
            _this.setConfig("isRepeat", _this.isRepeat)
        })

        // Lang nghe hanh vi click vao playlist
        playList.addEventListener("click", (e)=>{
            const songNode = e.target.closest(".playlist__song:not(.active)")
            if(songNode || e.target.closest(".playlist__song-option")){
                if(e.target.closest(".playlist__song:not(.active)")){
                    _this.currentSong = Number(songNode.dataset.index)
                    _this.setConfig("currentSong", _this.currentSong)
                    _this.loadCurrentSong()
                    if(_this.isSongUk){
                        _this.renderUk()
                    }else{
                        _this.renderVn()
                    }
                    audio.play()
                }
                if(e.target.closest(".playlist__song-option")){
                    // 
                    // 
                    // 
                }
            }
        })

        // Chuyen menu sang Vn
        menuVn.addEventListener("click",()=>{
            _this.isSongUk = false
            menuUk.classList.remove("active")
            menuVn.classList.add("active")
            _this.loadCurrentSong()
            _this.renderVn()
            audio.play()
            _this.setConfig("isSongUk", _this.isSongUk)
        })

        // Chuyen menu sang Uk
        menuUk.addEventListener("click",()=>{
            _this.isSongUk = true
            menuUk.classList.add("active")
            menuVn.classList.remove("active")
            if(_this.config.currentSong >= this.songsUk.length){
                _this.config.currentSong = this.songsUk.length - 1
            }
            _this.loadCurrentSong()
            _this.renderUk()
            audio.play()
            _this.setConfig("isSongUk", _this.isSongUk)
        })

    },

    scrollActiveSong: function(){
        setTimeout(()=>{
            $(".playlist__song.active").scrollIntoView({
                block: "center",
                behavior:  "smooth"
            })
        }, 100)
        
    },

    playRandomSong: function(){
        let randomSong 
        if(this.isSongUk){
            do{
                randomSong = Math.floor(Math.random() * this.songsUk.length)
            }while(randomSong === this.currentSong || this.played.includes(randomSong))
            if(this.played.length === this.songsUk.length - 1){
                this.played = []
            }
        }else{
            do{
                randomSong = Math.floor(Math.random() * this.songsWorld.length)
            }while(randomSong === this.currentSong || this.played.includes(randomSong))
            if(this.played.length === this.songsWorld.length - 1){
                this.played = []
            }
        }
        this.currentSong = randomSong
        this.played.push(randomSong)
        this.setConfig("currentSong", this.currentSong)
        this.loadCurrentSong()
    },

    nextSong: function(){
        this.currentSong++
        if(this.isSongUk){
            if(this.currentSong >= this.songsUk.length){
                this.currentSong = 0
            }
        }else{
            if(this.currentSong >= this.songsWorld.length){
                this.currentSong = 0
            }
        }
        this.setConfig("currentSong", this.currentSong)
        this.loadCurrentSong()
    },

    prevSong: function(){
        this.currentSong--
        if(this.isSongUk){
            if(this.currentSong >= this.songsUk.length){
                this.currentSong = this.songsUk.length - 2
            }
            if(this.currentSong <= -1){
                this.currentSong = this.songsUk.length -1
            }
        }else{
            if(this.currentSong <= -1){
                this.currentSong = this.songsWorld.length - 1 
            }
        }
        this.setConfig("currentSong", this.currentSong)
        this.loadCurrentSong()
    },

    loadCurrentSong: function(){
        currentTitle.textContent = this.getCurrentSong().name
        doashboardImageBlock.style.backgroundImage = `url(./assets/img/${this.getCurrentSong().image})`
        audio.src = `./assets/music/${this.getCurrentSong().path}`

        var arrLyrics = this.getCurrentSong().lyrics.split("|")
        var htmls = arrLyrics.map(lyric => `<p>${lyric}</p>`).join("")
        lyrics.innerHTML = htmls

        var durationTimeEl = this.getCurrentSong().duration
        var durationMinute = Math.floor(durationTimeEl/60)
        var durationSecond = durationTimeEl % 60  
        this.setDurationTime(durationMinute, durationSecond)
    },

    getCurrentSong: function(){
        if(this.isSongUk){
            return this.config.currentSong === undefined ? this.songsUk[this.currentSong] : this.songsUk[this.config.currentSong]
        }
        return this.config.currentSong === undefined ? this.songsWorld[this.currentSong] : this.songsWorld[this.config.currentSong]
    },


    setCurrentTime: function(currentTimeEl){
        var currentTimeFloor = Math.floor(currentTimeEl)
        var currentMinuteEl = Math.floor(currentTimeFloor / 60)
        var currentSecondEl = currentTimeFloor % 60

        currentMinute.innerHTML = `0${currentMinuteEl}`
        if(currentSecondEl < 10){
            currentSecond.innerHTML = `0${currentSecondEl}`
        }else{
            currentSecond.innerHTML = `${currentSecondEl}`
        }
    },

    
    setDurationTime: function(durationMinute, durationSecond){
        if(durationSecond < 10){
            durationTime.innerHTML = `0${durationMinute}:0${durationSecond}`
        }else{
            durationTime.innerHTML = `0${durationMinute}:${durationSecond}`
        }
    },


    start: function(){
        // Gan cau hinh tu config dc luu san
        this.loadConfig()

        // Xu ly cac events
        this.handleEvents()

        // Tai bai dau tien vao UI khi chay ung dung
        this.loadCurrentSong()

        // Render playlist
        if(this.isSongUk){
            menuUk.classList.add("active")
            menuVn.classList.remove("active")
            this.renderUk()

        }else{
            this.renderVn()
        }

        // Hien thi trang thai ban dau cau cac buttons
        if(this.isRepeat){
            repeatBtn.classList.toggle("active", this.isRepeat)
        }
        if(this.isRandom){
            randomBtn.classList.toggle("active", this.isRandom)
        }
        
    }
}

app.start()
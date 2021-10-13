var textCache;
var floatX;
var floatY;

function initfloatBar() {
    var wrap = document.createElement("div");
    wrap.setAttribute("v-if", "floatBarShow");
    wrap.id = "floatBar";
    wrap.className = "floatBar";
    wrap.innerHTML = `
    <div :style= "{ left: floatBarX + 'px', top: floatBarY + 'px', position: 'absolute', zIndex: 10000, width: '140px', display: 'flex', justifyContent: 'space-between' }" v-if="searchBarShow"><a @click.stop="search(1)"><img class="searchIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFZklEQVRYR71Xe2yTVRT/3fOxtuvWlY3XeAlOFDYhQ6YiD8nCokPFF/gAjBFkIgoRECQzZiASkIWQsIiJbhAi4aExwUQjQYgjcYEMh8KCYhA3mITHGK/B2nVdv3PNLf3a7+u6tSOL96/2O6/fPed37zlXIMElpUwDMJ2Zp0opc4UQWQBcIfNbUsqzQohaIvoZwI9CiFuJuBbxlKSUI5m5GMAsInLE01dyZm4FsIeINgghznRl0ykAKaWTmdcCWEJEWiKBo3WYOQBgMxGtEkIoUB1WTABSygeY+TsiyrmbwDGAnCSiGUKIf6JlHQBIKccx809E1DdaWb90AW2HDqD9+DEEGurBzTcBKUFpbmjDsmDLHQd7wTRog4d2wM3MTUT0pBDihFloARDa+eHo4Prli/CUf4a2qspgwC6XELBPykfKwiXQMgdZVEMgJpozEQYgpUxh5l+j0+47uA8tZaWQvpgl7BSLSHbCtfwj2POfiAahyjHe4EQYgK7rm4jofbO29+uv4Nn6+V3TwFE4Ha4PVsUqx0ZN01YqQRBA6Kj9aWa72vnt0o9jBu+VNQK2RydCGzgYEAL6xQvw1xxBoC5y4hzPvAjX0uKgPNbpIKJsVYqgVNf17UQ011BUZLtRNBuyzWexVQFTlxbDljc+JjD/sWrc3rQO9sn5SF20vMvMMfM2TdOKhJTSzcyXzZeMp+w9eH+otjhIyh4N9/oyCJdx+cX2L70eCGdK3LIxs5eIMhWAOQB2GRaytR56VQ68lQPRdqxf8DNl9EF6xW6QOz2u424qzBK6rm8lovmGIZ/7FFy3OvjX/1dvePcNQ+qS1VCE6unFzOUiEAjUaJr2cLj+vxdC3jgUjsW3hsD27N9Ar149HV9x76jKwDUiyjC8B6qGAv7GcDAx4CVoo3d3GrxgvSdhYCUv2JGfE9mIupgUAD8RJYUBVDoAyWGnNLwYdN8nPQJgfr4NcyaGQ6mu6f9fAbw+OQlzp9gi5Q0BuEpEfTotQf+Z0Mbs6ZEMLCyw4eXxlgw0dSTh8WmQ1yvDARtt2eg/6TckUfdIeLaJUVRh7R+rZ9gxZVTEj0HCqGNYCq4rCQLY3zYEpbdzseKRxXg+qyBhsinFb6rbUV7pt9jsWuREpjtyNQePoZRyNoAwzWXrOfiO5GBzSw72+oYHHWQ43NhduAl9HL0TAtHik5j3ZSuueyKt+56+hO0LkqPtX1UA0kJXcVi6uXotdjXUWpRHpWdhS34J3Laur+J2HSj51oeaet1i/3aBDa9Y66+u4gFGM9pGRG8aFpc8TZi1fxm8AWszynT2xcq8t/D4oLyYmThzswGlv1Tj7B9PAYiMkRkpAjveSUayzZL+Ck3TFhjt+H5mPkUUYdr+hiqUVJfFDDQ8bTAmZD6EoamZEELgSus1HL9yCrVXT0NCQvONgLNxMUTgTu9YM9OBySMjgJi5PdSO68wDyUYiWmGOuPP09yg7sSOhukcrCd2F5MZ3MS8v13L2lR4zb9A07UP12zySqTH8KBGNNjs78O9hrKv5At5A90YyTWgoyn4NRWOes2BjZvV4eUwIEaxv9FA6gpmPENGdPhxal71XsaV2Jw6ePwyON5QCyOv/IJaOfQOKuObFzI1EpIbSeuN7rLF8LDMfiAahDBQ5FYiaxpOoaz6PG23NwSHZbXdhmGsQxvYbhYIhEzAy/d4OZQsFL1TPN7Ows4eJysReIhpzVwSIMgqlXT1MwjvvNAOGQEqZzMxrACwzn47uAFJsB6Cm7TVGzTuQNZ5DKaXKhnqcziYiZzz9EMu9aswjolIhRF1XNnFfx6aMqCvw6ajnuTskb5ZS1pue5/uEEC2JgP0PiMlsM6t9TgAAAAAASUVORK5CYII=" alt="Google" title="Google" style="object-fit: fill;"></a>\
        <a @click.stop="search(2)"><img class="searchIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB70lEQVRYR2PkaWn5zzCAgHHUAbhCQJybmyFGX5/hwYcPDEcePmR4+fUrTSIKZxSAHLAtNpZBTViY4dbbtwy77t5lOHD/PsPOO3eo6hCiHACzEeQQr8WLqRoaJDng2efPDHZz5446YDQEBj4EQLmCj4OD4fbbtxRnSbJyAcjyXnd3hi+/fjHsuXuX4fCjR2Q7hiwHgErFmX5+DFG6uuAQAJUPZ549Yzj5+DHD1lu3SIoish3grqLCsCAwkIGHjQ0lGpBLzQvPnxN0DNkOABXVs/39GRwVFXGmA5Bjll26xNB77BhONWQ7AGRisZUVQ4OjI96ESKj4psgBsBozSk8PXGlhAzR1AMxCmEPSTEwYpHh5MdIEvgqMohCA2QRKkNlmZljTA01DQFVYmCHJyIghSFMTw+fEVuEkhQDMNyDDQa0lfHEPUgOqvtddv85QuXs39XLBrDNnGOwVFPBmP5Bt++/fZ5h66hTBFhRJIUBMwQ8KpaknTxJdIlLNAbAScMKxYwRLP2SP4HXAyrAwBmMpKbweB1VIm27eZJhz9izD6adPiQkkFDV4Oyam0tIMKcbGDH7q6hhlPinxjM9VRPWM0PM5rIxfcvEiScGNzSFEOQCkEVTaeaupMaiKiDDMO3eO7Pof3RFEO4DkyCVSw6gDALcvoZAQOBCnAAAAAElFTkSuQmCC" alt="Bing" title="Bing" style="object-fit: fill;"></a>\
        <a @click.stop="search(3)"><img class="searchIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFkklEQVR4Xu2bLWxUQRDHpwoEHw5SEnAtBgwUBQkloPgSRXEORAHXUBIkIEk4goPW4A4FggIKQklAUTBgaF1JINSVIkAd+fPYvL29nd2ZfXsv1/Recurm7cdvZmdnZvcNtdvtNm3gZ2gAYGABgyUw8AG98IHzS0Szb4kWV4rWR3cQTR4hGh/pRW/pbfbECd58TvTss39Qp/cR3TwlGzAgzi8Srf0pwI2PEm3dJHtXKpUdQGuB6O6rcPc3ThKd2c/LYMLTj4k+fu2UGd5G1DxXWFOuJysADPzMfaJff8LD27KJaO6KX5to41KrXDpuS3h3tpEPQlYAEu2bCV09TtQY6wbVeMhP3kiHAGotIyuAyVa32XIDOrC70KT9wGnOvpNNQeNLQi1mBTB2WzZ4I7VwvZSXLh/bCuandP35pPsGgGb5mInMnCc6uKcahL4BoFk+MT+iQdI3ALB7fP+pGToR50g1rfQNAK3/wCT7bglItjCjHQQzrQulrsbvxeMHV7O2E9Vo3ZYVW8C3VaIPy0TfVwvH43M+Gkfmmq/WB9S2DWJ7Qmz/ZqmTMcLS6ROdyQ0gnX0g08XTy0S7tpeyofzB16L7vqzXbqmoBcTM2tWEJJiZPFxkhvYD67r0SDaN82NE08dlsjGpIADJZNCBm9ykZoPTT7otzZ0AfMdMI19WyALQRGa+2Bzw4BNMYgQZxP6u5u0JclmgkTk6UqTSdkqMesPa77KV0Z06OCyAuU9Et17EDKj832fW+NcuiEhbw3JA//ApeOArkD7bjhcysDRf7IBlCf8kqR2wACTmaE/I3dakk02Rk/gL6VJhAaREZjn2ZQkQ6dgkSmEBpERmdQBAmezaEwmmQiZWfVp3AJqviB4tyAH46g7227UDgAYXfxAtLJcODp4bTk7itLQRI3oJWSYLIBYAuTpAZIg6H/dg4s2X4YwPAQ62yRCIFAChqJEFoDU17NHNCf/0NWFuzHtrFYMRhbJGFoAmrkcndyb8hx6ayRt8IQi1AcBgpFbAORpNdujaDtdmyhJ4PcUvq2AuEKvRY9CctmBB0FbsjCDkz33RZQqAJCdoBgYIiOvdrQexPTw357RSTNUHA0UT+yRIu6RiwVA0HZbvuKWkdpChPtxESxsIxeqG2QFUWfccCHeZSa0LW3PrYnhbzQoglEFCE3v/H2pCjjs9DkEwNUSJb5KeIWYDEDN7ey+WFlpcGG71CSCxJOx6AN7BMbo0sqwMANpAhBfTaA4AmFyuYqiBWwmAxBRNR7kAoD1fZSjFWeOdZACo9GBPlu7zOQGE4g8tiCQAIWcHj+27B3R6f1kGNz4Ajsre490bIZgMPPmwVT63ZfAuQnC7vN5zANzkMRkULCWXoAwAN9z1FWHcaNCVkXp7DozKArggBIPAFiXVRE4AZmKxyk9lAKEyuZtuAlTrfWeX9m2QXgBAbykQxBbA7fNuHYBbInZC0isAKXeHRACg/WP3/EbkUudOeesAgBFqj81EAEJe3zV/rppcFwBYgebukAhAKHS1AYQspS4AsAI3hQ5tjSIAoTjfLoUhOEKm5nvqBKC5OSICELIAd81xFRsJAJ//iMUBPti1AnA9L3fCKwGAMhrqkHZ2h6zOvlcsObHKDiB2GKnN0OxQmLszzK1bCQDN7RHREviXY0cuMWmOpO0lpXkP44gB6MkugI5jBQ/ImEsQ3CUqo1XXpyDh+fcxheB7gBgArTWKLSBHmVubqaXIa7ZAdT1Ae2skZQJV3gkdz1VOhkwD/QohdqaYDQAaCt3PCWkQg8TPlzZ/WSkuYZo7RRpLqFIiE/sA34AwWJzz/7JuablycIhbN8s/cUEcgQ+lABl+x1clQh9wnGi7cUjetm8OlQBotFRV1lyH016Di/W7bgDEJpL6/wDARv96/C9glXFumHb2HwAAAABJRU5ErkJggg==" alt="百度" title="百度" style="object-fit: fill;"></a>\
        <a @click.stop="search(4)"><img class="searchIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAELUlEQVRYR8VXa2wUVRT+7jx2pt2lLQSwimFrmmAwGoRWwEBbiQn8sGqswiY2Gl8J+EMFomIAHz/aaEysqD9ERY0hhUgrkBRtyo82paEPKRpfNLRpkLY8AtLS7WNndx7X3LldYLszu93SZs+PncnemXO+853vnDuXYMIauo3SvZ3G9t8uW4VjETon+v9MXr0eMrIiV+jcskqq2pAvHWO+CfupbA5XfNpm7JrJYMl8bXtYqtxVouwmDb1GaXlNuC7ZC7OxXl2mPE6eOqA1tvSZ62YjQDKfRYvFJpJXNR4cnaWaJwPg85ARMv+jMer2oCoBqmTLBOM6RcRM5vLmeqYM/FCm4MS/Fr7o0F1fTAhgd4mMN1bL9stvH4/g+98N+HMIluUKtnqzVQIGMlsh9n2WAmQpBD4PcN8CAQu8HPyeNh2VJ5xBpAxgrkrQ/JKKOQpn558rFkYjFEMaMKxRXNco8nIEPLZEtIMzetv6Lbz2cxh9w/FkJwTw5hoZmwsl29H7TToO/GncoNLrAdpeycCRLgMfNOl2IGYs68YXVOT6ePZVrTo+bJlmCZJVfH2+iOpnFNSeMfBWAw9SG1BQcJdg37OS7TgeuQHOyV9CBpIBYOsVj3psls4NUQyHKR7M5cEP/mVgW30EpqvEufcYAExgbnYhSGFY8asiAQ5uVLDuHl5zZq39FgKHNGg3K+bqNwbA1R2Zrg8u/zKEgWBsOpIAvLxCws5iD1jb3WpjEaB9wMSpC5Yt1J5BC/3D8a0cA+DbJ5UYJ/MygbWLeWaTAbD6v/eIjHvnC3YXfNVpoOcaxbslMhZlOTPZO0ix+ptQTIyEGlh1t4Bj5WoMgGK/iHeKZHsWnOwzcaTLxC/dJn7cpKDxnImfzhgo8ot4fpmEB+7gemBW32Nic10YoUkNkRIARQIC90toH7DQMWCC0Ry1aPmCYYr8PTzLvByCtX7Rvn7SqscFjxPhZAE4MeAkEkb4lQn9DIYonq0NY14GARtahACH/jZcWzElBqIi3Fkso2yphCwVEAgfxYnss3YdFc3TGMVuDLDMXl0pYSjER/D1EMX+p7mAL45QrNmn2cKcik2LASfHUQ10X7NsAFO1lAGw3W5uBqed1Zf1vyIS1AQ4A5dGKD7v0OGTCRb6iL17+rMJBkNAoEa7vS5gGnhxuYSP13tcE2TT7+x/lj0FNYPCtIDRiW6p6zZwtCv2oyJlBljkhxYJCIZ5AOY8pFOc386naNdVC8XfzWIJnFJnZendmjHzANjOtm9iPJdWa7g86qzsWwGwj46CvbHjNpEgb3s7Zs7Z0Dn7OmcgLQAWegnqn1PRct7E/j8MnL7osG+70JDWz3J2VEv/wYQdSssPp/FoxkqT1sNpVBv1PcYTX58ytp6+ZK4c1+Gd6ixP5blMGWMFd4q/bimUqjYs4cfz/wFrBQnaflYT7wAAAABJRU5ErkJggg==" alt="翻译" title="翻译" style="object-fit: fill;"></a>\
    </div>`;
    wrap.innerHTML += `
    <div id="tranBar" :style= "[transStyle,globalStyle]" v-if="transBarShow" class='output-mod dictionary-wrap dictionary-wrap-f result-section'>
        <div class='simple-dict simple-dict-f simple-dict-f-nimg'>
            <div class='output-bd clearfix' dir='ltr'>
                <div class='dictionary-output'>
                    <div class='dictionary-title'>
                        <h3 class='strong'>{{ simple_means.word_name }}</h3>
                        <div class='dictionary-spell' v-if='simple_means.symbols[0].ph_en || simple_means.symbols[0].ph_am'>
                            <span class='phonetic-transcription'>
                                <span>英</span> <b>[{{simple_means.symbols[0].ph_en}}]</b>
                                <a @click.stop="soundPlay(1, simple_means.word_name)" data-sound-lan='uk&amp;lock' data-sound-text='component' class='op-sound'>
                                    <span class='icon-sound sound-btn'></span> 
                                </a> 
                            </span> <span class='phonetic-transcription'> 
                                <span>美</span> <b>[{{simple_means.symbols[0].ph_am}}]</b> 
                                <a @click.stop="soundPlay(2, simple_means.word_name)" data-sound-lan='en&amp;lock' data-sound-text='component' class='op-sound'> 
                                    <span class='icon-sound sound-btn'></span> 
                                </a>
                            </span> 
                        </div>
                    </div>
                    <div class='dictionary-comment'>
                        <p v-for="symbol in simple_means.symbols[0].parts">  
                            <b v-if="symbol.part || symbol.part_name">{{symbol.part ? symbol.part : symbol.part_name}}</b>   
                            <strong class="dict-comment-mean">
                                <template v-for="(mean,index) in symbol.means">
                                    <span>{{mean}}</span>
                                    <span v-if="index != symbol.means.length - 1" class="dict-margin">;</span>
                                </template>
                            </strong>  
                        </p>
                    </div>
                </div>
                <div class='dictionary-exchange' v-if="simple_means.exchange != null">
                    <p v-for="(exWords, exName) in simple_means.exchange"> 
                        <span class="word-can-trans">{{tenseName(exName)}}：  
                            <a target="_blank" v-bind:href="'https://fanyi.baidu.com/#en/zh/'+ exWord" class="sec-trans" data-stat-id="69" v-bind:data-stat-add="tenseName(exName)" v-for="exWord in exWords">{{exWord}}</a>  
                        </span> 
                    </p>
                </div>
            </div>
            <div class='dictionary-bottom clearfix' v-if='simple_means.memory_skill != null || simple_means.tags != null'>
                <div class='dictionary-memory' v-if="simple_means.memory_skill != null"> 
                    <span class='memory-tit'>记忆技巧：</span><span class='momory-skill'>{{vue.simple_means.memory_skill}}</span> 
                </div>
                <ol class='dictionary-tags' v-if="simple_means.tags != null">
                    <li v-for="tag in simple_means.tags.core" v-if="tag != null && tag !== ''">{{tag}}</li>
                    <li v-for="tag in simple_means.tags.other" v-if="tag != null && tag !== ''">{{tag}}</li>
                </ol>
            </div>
        </div>
    </div>`;

    var first = document.body.firstChild;

    document.body.insertBefore(wrap, first);
}

var vue;

window.onload = function () {
    initfloatBar();
    vue = new Vue({
        el: '#floatBar',
        data: function () {
            return {
                simple_means: {},
                floatBarX: 0,
                floatBarY: 0,
                tranBarX: 0,
                tranBarY: 0,
                floatBarShow: false,
                searchBarShow: true,
                transBarShow: false,

                transStyle: { position: 'absolute', zIndex: 10000 },

                globalStyle: { position: 'absolute', zIndex: 10000 }
            }
        },
        created() {
        },
        methods: {
            search: function (type) {

                var selection = window.getSelection().toString();

                switch (type) {
                    case 1:
                        window.open(`https://www.google.com/search?q=${selection}`);
                        break;
                    case 2:
                        window.open(`https://cn.bing.com/search?q=${selection}`);
                        break;
                    case 3:
                        window.open(`https://www.baidu.com/s?wd=${selection}`);
                        break;

                    case 4:
                        this.trans(selection);
                        break;
                }
            },

            tenseName: function (exName) {
                switch (exName) {
                    case "word_done":
                        return "过去分词";

                    case "word_ing":
                        return "现在分词";

                    case "word_past":
                        return "过去式";

                    case "word_pl":
                        return "复数";

                    case "word_third":
                        return "第三人称单数";

                    case "word_er":
                        return "比较级";

                    case "word_est":
                        return "最高级";

                    case "word_proto":
                        return "原型";
                }
            },

            showfloatBar: function (event) {

                if (event.path.length > 0 && (event.path[0].className === "searchIcon" || event.path[0].className === "sec-trans"|| event.path[0].className === "icon-sound sound-btn"))
                    return;

                var selection = window.getSelection();

                var selectionText = selection.toString();

                if (selectionText == null || selectionText === "") {

                    vue.transBarShow = false;
                    vue.searchBarShow = true;
                    vue.floatBarShow = false;
                    return;
                }

                var bodyWidth = document.body.clientWidth;
                var bodyHeight = document.body.clientHeight;
                var barWidth = 140;
                var tranWidth = 500;

                var range = selection.getRangeAt(0);
                var rect = range.getBoundingClientRect();
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                if (rect.left > 0 || rect.right > 0 || rect.bottom > 0) {
                    vue.floatBarX = (rect.right + barWidth < bodyWidth) ? rect.right : (rect.left - barWidth);
                    vue.floatBarY = rect.bottom + scrollTop;


                    tranBarX = (rect.right + tranWidth < bodyWidth) ? rect.right : (rect.left - tranWidth);
                    tranBarY = rect.bottom + scrollTop;
                    vue.transStyle = { left: tranBarX + 'px', top: tranBarY + 'px', position: 'absolute', zIndex: 10000 };
                    // if (tranBarY > (bodyHeight / 4 * 3)) {
                    //     vue.transStyle = { left: tranBarX + 'px', Bottom: tranBarY + 'px', position: 'absolute', zIndex: 10000 }
                    // }
                    // else {
                    //     vue.transStyle = { left: tranBarX + 'px', top: tranBarY + 'px', position: 'absolute', zIndex: 10000 }
                    // }


                }
                else {
                    var left = range.startContainer.offsetLeft + range.startContainer.offsetWidth;
                    var top = range.startContainer.offsetTop + range.startContainer.offsetHeight;

                    for (var i = 0; i < range.startContainer.children.length; i++) {
                        var node = range.startContainer.children[i];

                        if (node.nodeName.toUpperCase() === "TEXTAREA" || (node.nodeName.toUpperCase() === "INPUT" && node.type === "text")) {

                            var reactObj = node.getBoundingClientRect();

                            vue.floatBarX = (reactObj.left + reactObj.width + barWidth < bodyWidth) ? (reactObj.left + reactObj.width) : (reactObj.left - barWidth);

                            vue.floatBarY = reactObj.top + reactObj.height + scrollTop;

                            tranBarX = (reactObj.left + reactObj.width + tranWidth < bodyWidth) ? (reactObj.left + reactObj.width) : (reactObj.left - tranWidth);

                            tranBarY = reactObj.top + reactObj.height + scrollTop;

                            vue.transStyle = { left: tranBarX + 'px', top: tranBarY + 'px', position: 'absolute', zIndex: 10000 };
                        }
                    }
                }

                vue.transBarShow = false;
                vue.floatBarShow = true;
                vue.searchBarShow = true;
            },

            trans: function (word) {
                chrome.runtime.sendMessage(word);
            },

            soundPlay: function(type, word){

                var country = type === 1 ? "uk" : "en";

                var audio= new Audio(`https://sp0.baidu.com/-rM1hT4a2gU2pMbgoY3K/gettts?lan=${country}&text=${word}&spd=2&source=alading`);
                audio.play();
            }
        }
    });

    document.addEventListener('mouseup', vue.$options.methods.showfloatBar, false)
}

chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
    if (request == null) {
        return;
    }

    vue.simple_means = request.dict_result.simple_means;

    vue.searchBarShow = false;
    vue.transBarShow = true;
});


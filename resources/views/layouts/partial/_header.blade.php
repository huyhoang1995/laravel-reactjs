<header id="navbar">
    <div id="navbar-container" class="boxed">

        <!--Brand logo & name-->
        <!--================================-->
        <div class="navbar-header">
            <div class="navbar-brand">
                <img ng-src="@{{loadImage()}}" class="brand-icon cat-brand-icon img-circle img-user">
                <div class="cat-title">
                    <div class="cat-admin">{{Auth::user()->name}}</div>

                    <div class="cat-acc"><a class="cat-a" href="{{url('')}}/userInfo">Tài khoản</a> | <a class="cat-a" href="{{url('/logout')}}">Đăng xuất</a></div>

                </div>

                <!-- <div class="brand-title">
                        <div>a</div>
                </div> -->
            </div>
        </div>
        <!--================================-->

        <div class="navbar-content clearfix">
            <ul class="nav navbar-top-links pull-left">

                <!--Navigation toogle button-->
                <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
                <li class="cat-text-head">

                    <img src="{{url('')}}/images/logo.png" alt="Nifty Logo" class="brand-icon cat-head-img-next">

                </li>

                <li>
                    <div class="cat-head-text">{{config('info.brandName')}}</div>
                </li>
            </ul>
        </div>
    </div>
</header>
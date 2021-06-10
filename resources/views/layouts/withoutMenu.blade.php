<!DOCTYPE html>
<html>
    <head>
        <title> @yield('title') </title>
        <link rel="icon" href="{{url('/')}}/favicon.ico" sizes="16x16">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        
        @includeif('Layouts.partial._default_css')
        @includeif ('Layouts.partial._angular')
        @includeif('Layouts.partial._css')
        @yield('myCss')
        <script>
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            var SiteUrl = '{{url("/")}}';
            var arrUserRole = {!!json_encode(app('UserRoleConfig')->getListRoleCurUser())!!};
            var curUserInfo = {!!json_encode(auth()->user()->toArray())!!};
            var Config = {
                brandName: "{{config('info.brandName')}}"
            };
        </script>
    </head>
    <body class="nifty-ready pace-done" ng-app="ngApp" ng-cloak>
        <div id="container" class="effect mainnav-in">
            @includeif('Layouts.partial._header')
            <div class="boxed">
                <div id="content-container">
                    <!--Page content-->
                    <!--===================================================-->
                    <div id="page-content">
                        <div class="row">
                            @yield('content')
                        </div>                  
                    </div>
                    <!--===================================================-->
                    <!--End page content-->
                </div>
            </div>
            @includeif('Layouts.partial._modalLoader')
            @includeif('Layouts.partial._default_js')
            @includeif('Layouts.partial._js')
            @yield('myJs')
<!--            @includeif('Layouts.partial._footer')-->
        </div>
    </body>
</html>

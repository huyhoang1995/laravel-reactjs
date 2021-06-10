<nav id="mainnav-container">
    <div id="mainnav" class="cat-mainnav">
        <div id="mainnav-menu-wrap">
            <div class="nano">
                <div class="nano-content">
                    <ul id="mainnav-menu" class="list-group">
                        @if(app('UserRoleConfig')->isSuperAdmin())
                        <li class=" cat-hover {{ request()->is('user') ? 'active active-link' : '' }}">
                            <a href="{{route('user')}}">
                                <i class="fa fa-user"></i>
                                <span class="menu-title">
                                    <b>Người sử dụng</b>
                                </span>
                            </a>
                        </li>
                        @endif 
                    </ul>
                </div>
            </div>
        </div>
    </div>
</nav>
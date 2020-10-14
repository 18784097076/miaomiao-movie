export default {
    path: '/movie',
    redirect: '/movie/nowPlaying',
    component: () => import('@/views/Movie'),
    children: [
        { path: 'city', component: () => import('@/components/City') },
        { path: 'nowPlaying', component: () => import('@/components/NowPlaying') },
        { path: 'comingSoon', component: () => import('@/components/ComingSoon') },
        { path: 'search', component: () => import('@/components/Search') },
        {
            path: 'detail/1/:movieId',
            components: {
                // 对应movie中没有name的router-view
                default: () => import('@/components/NowPlaying'),
                // 对应movie中的name为detail的router-view
                detail: () => import('@/views/Movie/detail')
            },
            props: {
                detail: true
            }
        },
        {
            path: 'detail/2/:movieId',
            components: {
                default: () => import('@/components/ComingSoon'),
                // 对应movie中的name为detail的router-view
                detail: () => import('@/views/Movie/detail')
            },
            props: {
                detail: true
            }
        }
    ]
}
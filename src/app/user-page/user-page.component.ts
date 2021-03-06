import { Component, OnInit } from '@angular/core';

import { APIService, SearchablePostSortableFields, SearchableSortDirection } from 'src/app/api.service';
import * as t from 'src/types';

import { AmplifyService } from 'aws-amplify-angular';

// https://qiita.com/Hitomi_Nagano/items/1df47c72d6db863831c6#%E7%B0%A1%E5%8D%98%E5%AE%9F%E8%A3%85
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  hide = {};

  /** blogフォーム状態 */
  blog: t.Blog = {
    id: null,
    name: null
  };

  /** postフォーム状態 */
  post: t.Post = {
    id: null,
    title: null,
    blogID: null
  };

  /** commentフォーム状態 */
  comment: t.Comment = {
    id: null,
    content: null,
    postID: null
  };

  /** blogリスト */
  blogList = [];

  /** postリスト */
  postList = [];

  /** commentリスト */
  commentList = [];

  /** constractor */
  constructor(
    private api: APIService,
    public amplify: AmplifyService
  ) { }

  /**
   * 初期設定
   */
  async ngOnInit(): Promise<void> {

    // ..
    const resp = await Auth.currentSession()
    const accessToken = resp.getAccessToken().getJwtToken();
    console.log('token: ' + accessToken);

    // ..
    const data = await Auth.currentUserPoolUser()
    console.log( data );

    // handle auth state changes
    this.amplify.authStateChange$.subscribe(authState => {
      console.log(authState);
    });

      // console.log( this.amplify. );

    /**
     * ===== blog初期設定
     */

    // blogリスト取得
    this.api.ListBlogs().then(e => {
      this.blogList = e.items;
      this.updateBlogSelect();
    });

    // blog作成検知
    this.api.OnCreateBlogListener.subscribe(
      // リスト更新
      (e: any) => {
        // this.blogList = [e.value.data.onCreateBlog, ...this.blogList];
        this.blogList.push(e.value.data.onCreateBlog);
        this.updateBlogSelect();
      });

    /**
     * ===== post初期設定
     */

    // postリスト取得
    this.api.ListPosts().then(e => {
      this.postList = e.items;
      this.updatePostSelect();
    });

    // post作成検知
    this.api.OnCreatePostListener.subscribe(
      // リスト更新
      (e: any) => {
        // this.postList = [e.value.data.onCreatePost, ...this.postList];
        this.postList.push(e.value.data.onCreatePost);
        this.updatePostSelect();
      });

    /**
     * ===== comment初期設定
     */

    // commentリスト取得
    this.api.ListComments().then(e => {
      this.commentList = e.items;
    });

    // comment作成検知
    this.api.OnCreateCommentListener.subscribe(
      // リスト更新
      (e: any) => this.commentList = [e.value.data.onCreateComment, ...this.commentList]);

    // filter sample =====
    setTimeout(() => {
      // sort by erasticsearch
      this.api.SearchPosts({
        title: { eq: 'aaa' },
      }, {
        field: SearchablePostSortableFields.createdAt,
        direction: SearchableSortDirection.desc
      }).then(
        e => console.log(e)
      );

    }, 555);
  }

  /** blog選択状態更新 */
  updateBlogSelect(): void {
    // blogを選ぶselectの選択を最新blogに
    if (this.blogList.length > 0) {
      this.post.blogID = this.blogList[this.blogList.length - 1].id;
    }
  }

  /** post選択状態更新 */
  updatePostSelect(): void {
    // postを選ぶselectの選択を最新postに
    if (this.postList.length > 0) {
      this.comment.postID = this.postList[this.postList.length - 1].id;
    }
  }

  /** blogを作成 */
  createBlog(): void {
    this.api.CreateBlog(this.blog)
      .then(e => console.log(e))
      .catch(e => console.log('error creating blog...', e));
  }

  /** blogを取得 */
  getBlog(id: string): void {
    this.api.GetBlog(id)
      .then(e => console.log(e))
      .catch(e => console.log(e));
  }

  /** blog削除 */
  deleteBlog(id): void {
    this.api.DeleteBlog({ id })
      .then(e => console.log(e))
      .catch(e => console.log(e));
  }

  /** postを作成 */
  createPost(): void {
    this.api.CreatePost(this.post)
      .then(e => console.log(e))
      .catch(e => console.log('error creating post...', e));
  }

  /** postを取得 */
  getPost(id: string): void {
    this.api.GetPost(id)
      .then(e => console.log(e))
      .catch(e => console.log(e));
  }

  /** post削除 */
  deletePost(id): void {
    this.api.DeletePost({ id })
      .then(e => console.log(e))
      .catch(e => console.log(e));
  }

  /** commentを作成 */
  createComment(): void {
    console.log(this.comment);
    this.api.CreateComment(this.comment)
      .then(e => console.log(e))
      .catch(e => console.log('error creating comment...', e));
  }

  /** postを取得 */
  getComment(id: string): void {
    this.api.GetComment(id)
      .then(e => console.log(e))
      .catch(e => console.log(e));
  }

  /** comment削除 */
  deleteComment(id): void {
    this.api.DeleteComment({ id })
      .then(e => console.log(e))
      .catch(e => console.log(e));
  }


}

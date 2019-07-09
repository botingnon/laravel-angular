<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Post;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Post::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $post = new Post();
        $post->nome = $request->input('nome');
        $post->email = $request->input('email');
        $post->titulo = $request->input('titulo');
        $post->subtitulo = $request->input('subtitulo');
        $post->mensagem = $request->input('mensagem');
        $post->arquivo = $request->file('arquivo')->store('images', 'public');
        $post->likes = 0;
        $post->save();

        return response($post, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $post = Post::find($id);
        if (isset($post)) {
            Storage::disk('public')->delete($post->arquivo);
            $post->delete();
            return 204;
        }

        return response('Post não encontrado', 404);
    }

    /**
     * Like the resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function like($id)
    {
        $post = Post::find($id);
        if (isset($post)) {
            $post->likes++;
            $post->save();

            return response($post, 200);
        }

        return response('Post não encontrado', 404);
    }
}

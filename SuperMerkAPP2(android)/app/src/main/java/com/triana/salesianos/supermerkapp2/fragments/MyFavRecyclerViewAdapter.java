package com.triana.salesianos.supermerkapp2.fragments;

import android.content.Context;
import android.content.Intent;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.triana.salesianos.supermerkapp2.R;
import com.triana.salesianos.supermerkapp2.UtilToken;
import com.triana.salesianos.supermerkapp2.activities.LoginActivity;
import com.triana.salesianos.supermerkapp2.models.ProductResponse;
import com.triana.salesianos.supermerkapp2.retrofit.generator.AuthType;
import com.triana.salesianos.supermerkapp2.retrofit.generator.ServiceGenerator;
import com.triana.salesianos.supermerkapp2.retrofit.services.ProductService;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MyFavRecyclerViewAdapter extends RecyclerView.Adapter<MyFavRecyclerViewAdapter.ViewHolder> {

    private final List<ProductResponse> mValues;
    private final FavFragment.OnListFragmentInteractionListener mListener;
    Context contexto;
    ProductService service;
    String jwt;

    public MyFavRecyclerViewAdapter(Context ctx, List<ProductResponse> items, FavFragment.OnListFragmentInteractionListener listener) {
        this.contexto = ctx;
        mValues = items;
        mListener = listener;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_fav, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, int position) {
        jwt = UtilToken.getToken(contexto);
        holder.mItem = mValues.get(position);
        holder.title.setText(mValues.get(position).getName());
        holder.fav.setOnClickListener(v -> {


            if (jwt == null) {
                Intent i = new Intent(contexto, LoginActivity.class);
                contexto.startActivity(i);
            } else {

                service = ServiceGenerator.createService(ProductService.class, jwt, AuthType.JWT);

                Call<ProductResponse> call = service.deleteFav(holder.mItem.getId());
                call.enqueue(new Callback<ProductResponse>() {
                    @Override
                    public void onResponse(Call<ProductResponse> call, Response<ProductResponse> response) {
                        if (response.code() != 200) {
//                            Toast.makeText(contexto, "Error in request", Toast.LENGTH_SHORT).show();
                        } else {
                            Toast.makeText(contexto, "Deleted from favourites", Toast.LENGTH_LONG).show();
                        }
                    }

                    @Override
                    public void onFailure(Call<ProductResponse> call, Throwable t) {
//                        Toast.makeText(contexto, "Failure", Toast.LENGTH_SHORT).show();
                    }
                });
            }

            holder.fav.setImageResource(R.drawable.ic_empty_fav);

        });

    }


    @Override
    public int getItemCount() {
        return mValues.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public final TextView title;
        public final TextView market;
        public final ImageView fav;
        public ProductResponse mItem;

        public ViewHolder(View view) {
            super(view);
            mView = view;
            title = view.findViewById(R.id.title);
            market = view.findViewById(R.id.nameMarketFav);
            fav = view.findViewById(R.id.favProductFav);
        }
    }

}

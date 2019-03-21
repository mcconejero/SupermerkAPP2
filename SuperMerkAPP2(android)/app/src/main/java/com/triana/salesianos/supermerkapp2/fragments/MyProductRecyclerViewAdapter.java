package com.triana.salesianos.supermerkapp2.fragments;

import android.content.Context;
import android.content.Intent;
import android.support.v7.app.AlertDialog;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.triana.salesianos.supermerkapp2.R;
import com.triana.salesianos.supermerkapp2.UtilToken;
import com.triana.salesianos.supermerkapp2.activities.LoginActivity;
import com.triana.salesianos.supermerkapp2.fragments.ProductFragment.OnListFragmentInteractionListener;
import com.triana.salesianos.supermerkapp2.models.ProductResponse;
import com.triana.salesianos.supermerkapp2.retrofit.generator.AuthType;
import com.triana.salesianos.supermerkapp2.retrofit.generator.ServiceGenerator;
import com.triana.salesianos.supermerkapp2.retrofit.services.ProductService;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class MyProductRecyclerViewAdapter extends RecyclerView.Adapter<MyProductRecyclerViewAdapter.ViewHolder> {

    private final List<ProductResponse> mValues;
    private final OnListFragmentInteractionListener mListener;
    private Context ctx;
    private ProductService service;

    public MyProductRecyclerViewAdapter(Context context, List<ProductResponse> items, OnListFragmentInteractionListener listener) {
        mValues = items;
        mListener = listener;
        ctx = context;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_product, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, int position) {
        String jwt = UtilToken.getToken(ctx);
        holder.mItem = mValues.get(position);
        holder.mTitle.setText(mValues.get(position).getName());
        holder.mMarket.setText(mValues.get(position).getMarketId().getName());

        holder.mFav.setOnClickListener(v -> {


            if (jwt == null) {
                AlertDialog.Builder builder = new AlertDialog.Builder(ctx);
                builder.setTitle("Add to favourites").setMessage("Do you want to add to favorites?");
                builder.setPositiveButton("Ok", (dialog, which) ->
                        ctx.startActivity(new Intent(ctx, LoginActivity.class)));
                builder.setNegativeButton("Cancel", (dialog, id) -> {
                    Log.d("Back", "Going back");
                });
                AlertDialog dialog = builder.create();

                dialog.show();

            } else {

                service = ServiceGenerator.createService(ProductService.class, jwt, AuthType.JWT);

                if (holder.mFav.isEnabled() == true){

                    Call<ProductResponse> call = service.addFav(holder.mItem.getId());
                    call.enqueue(new Callback<ProductResponse>() {
                        @Override
                        public void onResponse(Call<ProductResponse> call, Response<ProductResponse> response) {
                            if (!response.isSuccessful()) {
                                Toast.makeText(ctx, "Error in request", Toast.LENGTH_SHORT).show();
                            } else {
                                Toast.makeText(ctx, "Added to favourites", Toast.LENGTH_LONG).show();
                                holder.mFav.setImageResource(R.drawable.ic_full_fav);
                            }
                        }

                        @Override
                        public void onFailure(Call<ProductResponse> call, Throwable t) {
                            Toast.makeText(ctx, "Failure", Toast.LENGTH_SHORT).show();
                        }
                    });

                }else{

                    Call<ProductResponse> call = service.deleteFav(holder.mItem.getId());
                    call.enqueue(new Callback<ProductResponse>() {
                        @Override
                        public void onResponse(Call<ProductResponse> call, Response<ProductResponse> response) {
                            if (response.code() != 200) {
                                Toast.makeText(ctx, "Error in request", Toast.LENGTH_SHORT).show();
                            } else {
                                Toast.makeText(ctx, "Deleted from favourites", Toast.LENGTH_LONG).show();
                                holder.mFav.setImageResource(R.drawable.ic_empty_fav);
                            }
                        }

                        @Override
                        public void onFailure(Call<ProductResponse> call, Throwable t) {
                        }
                    });
                }
            }
        });

    }

    @Override
    public int getItemCount() {
        return mValues.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public final TextView mTitle;
        public final TextView mMarket;
        public final ImageView mFav;
        public ProductResponse mItem;

        public ViewHolder(View view) {
            super(view);
            mView = view;
            mTitle = view.findViewById(R.id.nameProduct);
            mMarket = view.findViewById(R.id.nameMarket);
            mFav = view.findViewById(R.id.favProduct);
        }

    }
}

package com.triana.salesianos.supermerkapp2.fragments;

import android.content.Context;
import android.content.Intent;
import android.support.constraint.ConstraintLayout;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import com.bumptech.glide.Glide;
import com.triana.salesianos.supermerkapp2.R;
import com.triana.salesianos.supermerkapp2.activities.MarketActivity;
import com.triana.salesianos.supermerkapp2.fragments.CategoryFragment.OnListFragmentInteractionListener;
import com.triana.salesianos.supermerkapp2.models.CategoryResponse;
import com.triana.salesianos.supermerkapp2.models.ResponseContainerTwo;
import com.triana.salesianos.supermerkapp2.retrofit.generator.ServiceGenerator;
import com.triana.salesianos.supermerkapp2.retrofit.services.CategoryService;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class MyCategoryRecyclerViewAdapter extends RecyclerView.Adapter<MyCategoryRecyclerViewAdapter.ViewHolder> {

    private final List<CategoryResponse> mValues;
    private final OnListFragmentInteractionListener mListener;
    Context ctx;
    CategoryService service;

    public MyCategoryRecyclerViewAdapter(Context context, List<CategoryResponse> items, OnListFragmentInteractionListener listener) {
        mValues = items;
        mListener = listener;
        ctx = context;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_category, parent, false);

        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, int position) {
        holder.mItem = mValues.get(position);
        holder.mTitle.setText(mValues.get(position).getName());
        holder.mMessage.setText(mValues.get(position).getMessage());
        Glide
                .with(ctx)
                .load(mValues.get(position).getPicture())
                .into(holder.mPhoto);

        holder.mConstraintLayout.setOnClickListener(v -> {
            System.out.println(holder.mItem.getId());
            service = ServiceGenerator.createService(CategoryService.class);
            Call<ResponseContainerTwo<CategoryResponse>> callOne = service.getOneCategory(holder.mItem.getId());
            callOne.enqueue(new Callback<ResponseContainerTwo<CategoryResponse>>() {

                @Override
                public void onResponse(Call<ResponseContainerTwo<CategoryResponse>> call, Response<ResponseContainerTwo<CategoryResponse>> response) {
                    CategoryResponse resp = response.body().getRows();
                    Intent marketActivity = new Intent(ctx , MarketActivity.class);
                    marketActivity.putExtra("categoriaId", mValues.get(position).getId());
                    ctx.startActivity(marketActivity);
                }

                @Override
                public void onFailure(Call<ResponseContainerTwo<CategoryResponse>> call, Throwable t) {

                }
            });
        });

    }

    @Override
    public int getItemCount() {
        return mValues.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public CategoryResponse mItem;
        public ConstraintLayout mConstraintLayout;
        public final TextView mTitle;
        public final TextView mMessage;
        public final ImageView mPhoto;

        public ViewHolder(View view) {
            super(view);
            mView = view;
            mTitle = view.findViewById(R.id.nameProduct);
            mPhoto = view.findViewById(R.id.picture);
            mMessage = view.findViewById(R.id.etMessage);
            mConstraintLayout = view.findViewById(R.id.constraint);
        }
    }
}
